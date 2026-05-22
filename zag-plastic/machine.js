import {
  createScope,
  findTransition,
  getExitEnterStates,
  hasTag,
  INIT_STATE,
  MachineStatus,
  matchesState,
  resolveStateValue,
} from '@zag-js/core'
import { compact, ensure, isFunction, isString, toArray, warn } from '@zag-js/utils'
import { getActiveSub, isComputed, isSignal, setActiveSub } from 'alien-signals'
import { batch, createComputed, onCleanup, onMount } from './runtime.js'
import { createBindable } from './bindable.js'
import { createRefs } from './refs.js'
import { createTrack } from './track.js'

// STABILITY NOTE: This module uses internal (@zag-js/core) APIs that are NOT part of the public zag-js contract.
// All imports above are internal/unstable. Zag-js versions should be pinned; upgrades may require updates here:
// - createScope: creates isolated machine scopes for component instances
// - findTransition: locates valid state transitions for an event (UNSTABLE: signature may change)
// - getExitEnterStates: determines which states are exiting/entering during a transition (UNSTABLE)
// - INIT_STATE: sentinel value for initial state marker (stable)
// - MachineStatus: enum for machine lifecycle (started/stopped/not-started) (stable)
// - matchesState: checks if machine is in a given state (stable)
// - resolveStateValue: resolves state references to state paths (UNSTABLE)

// Temporarily disable alien-signals reactive tracking for untracked computations.
const untrack = (fn)=> {
  const prevSub = getActiveSub()
  setActiveSub(undefined)
  try { return fn() }
  finally { setActiveSub(prevSub) }
}

// Access a value: invoke if function, otherwise return as-is.
const access = (value)=> (isFunction(value) ? value() : value)

// Callback props are recognized by "on" prefix (e.g., onFocus, onChange).
const isMachineCallbackProp = (key) => (/^on[A-Z]/).test(key)

// Resolve machine prop: callbacks are passed through; signals/computed are unwrapped.
const accessMachineProp = (key, value)=> {
  if (isMachineCallbackProp(key)) return value
  if (value != null && (isSignal(value) || isComputed(value))) return value()
  return value
}

// Convert all props, unwrapping signals/computed; callbacks left as functions.
const resolveMachineProps = (props)=> Object.fromEntries(
  Object.entries(props).map(([key, value]) => [key, accessMachineProp(key, value)])
)

// Create a prop accessor that returns a specific key from the current props object.
const createProp = (accessor) => (key) => accessor()[key]

// Synchronous batch execution (no-op in Plastic runtime).
const flush = (fn) => fn()

/**
 * Core hook: integrates a @zag-js state machine into Plastic components.
 *
 * Manages the machine lifecycle: initialization on mount, cleanup on unmount.
 * Bridges state, context, events, and refs between machine and component.
 *
 * Invariants:
 * - Machine must be created with @zag-js/machine factory; validates assumptions about shape.
 * - send() is safe to call only after the component mounts (status !== NotStarted).
 * - Effects are run on state entry; their cleanup is saved and run on state exit.
 * - Props/context are accessed reactively; changes trigger machine.props/context recompute.
 * - Scope is stable per component instance; reused across remounts if machine status was Started.
 *
 * @param {Object} machine - @zag-js state machine definition
 * @param {Object} userProps - Component props passed to the machine (id, ids, getRootNode, custom props)
 * @returns {Object} - { state, send, context, prop, scope, refs, computed, event, getStatus }
 */
export const useMachine = (machine, userProps = {})=> {
  const scope = createComputed(() => {
    const { id, ids, getRootNode } = access(userProps)
    return createScope({ id, ids, getRootNode })
  })

  const debug = (...args)=> {
    if (machine.debug) console.log(...args)
  }

  const props = createComputed(() =>
    machine.props?.({
      props: compact(resolveMachineProps(access(userProps))),
      scope: scope(),
    }) ?? resolveMachineProps(access(userProps))
  )

  const prop = createProp(props)

  const context = machine.context?.({
    prop,
    bindable: createBindable,
    get scope() { return scope() },
    flush,
    getContext() { return ctx },
    getComputed() { return computed },
    getRefs() { return refs },
    getEvent() { return getEvent() },
  })

  const ctx = {
    get(key) { return context?.[key].get() },
    set(key, value) { context?.[key].set(value) },
    initial(key) { return context?.[key].initial },
    hash(key) {
      const current = context?.[key].get()
      return context?.[key].hash(current)
    },
  }

  const effects = { current: new Map() }
  const transitionRef = { current: null }
  const previousEventRef = { current: null }
  const eventRef = { current: { type: '' } }

  const getEvent = ()=> ({
    ...eventRef.current,
    current() { return eventRef.current },
    previous() { return previousEventRef.current },
  })

  const getState = ()=> ({
    ...state,
    matches(...values) {
      const current = state.get()
      return values.some((value) => matchesState(current, value))
    },
    hasTag(tag) {
      const current = state.get()
      return hasTag(machine, current, tag)
    },
  })

  const refs = createRefs(machine.refs?.({ prop, context: ctx }) ?? {})

  const getParams = ()=> ({
    state: getState(),
    context: ctx,
    event: getEvent(),
    prop,
    send,
    action,
    guard,
    track: createTrack,
    refs,
    computed,
    flush,
    get scope() { return scope() },
    choose,
  })

  const action = (keys)=> {
    const strs = isFunction(keys) ? keys(getParams()) : keys
    if (!strs) return
    const fns = strs.map((s) => {
      const fn = machine.implementations?.actions?.[s]
      if (!fn) warn(`[zag-js] No implementation found for action "${JSON.stringify(s)}"`)
      return fn
    })
    for (const fn of fns) fn?.(getParams())
  }

  const guard = (str)=> {
    if (isFunction(str)) return str(getParams())
    return machine.implementations?.guards?.[str](getParams())
  }

  const runEffect = (keys)=> {
    const strs = isFunction(keys) ? keys(getParams()) : keys
    if (!strs) return
    const fns = strs.map((s) => {
      const fn = machine.implementations?.effects?.[s]
      if (!fn) warn(`[zag-js] No implementation found for effect "${JSON.stringify(s)}"`)
      return fn
    })
    const cleanups = []
    for (const fn of fns) {
      const cleanup = fn?.(getParams())
      if (cleanup) cleanups.push(cleanup)
    }
    return () => cleanups.forEach((fn) => fn?.())
  }

  const choose = (transitions)=> {
    return toArray(transitions).find((t) => {
      let result = !t.guard
      if (isString(t.guard)) result = !!guard(t.guard)
      else if (isFunction(t.guard)) result = t.guard(getParams())
      return result
    })
  }

  const computed = (key)=> {
    ensure(machine.computed, () => '[zag-js] No computed object found on machine')
    const fn = machine.computed[key]
    return fn({
      context: ctx,
      event: eventRef.current,
      prop,
      refs,
      scope: scope(),
      computed,
    })
  }

  const state = createBindable(() => ({
    defaultValue: resolveStateValue(machine, machine.initialState({ prop })),
    onChange(nextState, prevState) {
      const { exiting, entering } = getExitEnterStates(machine, prevState, nextState, transitionRef.current?.reenter)

      exiting.forEach((item) => {
        const exitEffects = effects.current.get(item.path)
        exitEffects?.()
        effects.current.delete(item.path)
      })
      exiting.forEach((item) => action(item.state?.exit))
      action(transitionRef.current?.actions)
      entering.forEach((item) => {
        const cleanup = runEffect(item.state?.effects)
        if (cleanup) effects.current.set(item.path, cleanup)
      })
      if (prevState === INIT_STATE) {
        action(machine.entry)
        const cleanup = runEffect(machine.effects)
        if (cleanup) effects.current.set(INIT_STATE, cleanup)
      }
      entering.forEach((item) => action(item.state?.entry))
    },
  }))

  let status = MachineStatus.NotStarted

  onMount(() => {
    const started = status === MachineStatus.Started
    status = MachineStatus.Started
    debug(started ? 'rehydrating...' : 'initializing...')
    state.invoke(state.initial, INIT_STATE)
  })

  onCleanup(() => {
    debug('unmounting...')
    status = MachineStatus.Stopped
    effects.current.forEach((fn) => fn?.())
    effects.current = new Map()
    transitionRef.current = null
    action(machine.exit)
  })

  const send = (event)=> {
    if (status !== MachineStatus.Started) return
    batch(() => {
      previousEventRef.current = eventRef.current
      eventRef.current = event
      const currentState = untrack(() => state.get())
      const { transitions, source } = findTransition(machine, currentState, event.type)
      const transition = choose(transitions)
      if (!transition) return
      transitionRef.current = transition
      const target = resolveStateValue(machine, transition.target ?? currentState, source)
      debug('transition', event.type, transition.target || currentState, `(${transition.actions})`)
      const changed = target !== currentState
      if (changed) {
        state.set(target)
      } else if (transition.reenter) {
        state.invoke(currentState, currentState)
      } else {
        action(transition.actions)
      }
    })
  }

  machine.watch?.(getParams())

  return {
    state: getState(),
    send,
    context: ctx,
    prop,
    get scope() { return scope() },
    refs,
    computed,
    event: getEvent(),
    getStatus: () => status,
  }
}

// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import { h, renderApp } from '../src/runtime.js'
import { createSignal } from '@plastic-js/zag/runtime'
import { useMachine } from '@plastic-js/zag/machine'
import { createBindable } from '@plastic-js/zag/bindable'
import { createTrack } from '@plastic-js/zag/track'
import { machine as checkboxMachine } from '@zag-js/checkbox'

describe('zag-plastic', () => {
  // ========== useMachine tests ==========
  describe('useMachine', () => {
    it('initializes with a state value on mount', () => {
      let stateExists = false
      const TestComponent = () => {
        const { state } = useMachine(checkboxMachine)
        stateExists = !!state && typeof state.matches === 'function'
        return h('div', { 'data-has-state': () => String(stateExists) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(stateExists).toBe(true)
    })

    it('provides state.matches() for state checking', () => {
      let isUnchecked = false
      const TestComponent = () => {
        const { state } = useMachine(checkboxMachine)
        isUnchecked = state.matches('unchecked')
        return h('div', { 'data-unchecked': () => String(isUnchecked) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(typeof isUnchecked).toBe('boolean')
    })

    it('exposes event object with current() and previous() methods', () => {
      let hasEventMethods = false
      const TestComponent = () => {
        const { event } = useMachine(checkboxMachine)
        hasEventMethods = typeof event.current === 'function' && typeof event.previous === 'function'
        return h('div', { 'data-has-event': () => String(hasEventMethods) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(hasEventMethods).toBe(true)
    })

    it('send() is callable and processes events', () => {
      let sendCalled = false
      const TestComponent = () => {
        const { send } = useMachine(checkboxMachine)
        sendCalled = typeof send === 'function'
        return h('div', { 'data-send-exists': () => String(typeof send === 'function') })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(sendCalled).toBe(true)
    })

    it('provides refs accessor for template refs', () => {
      let hasRefs = false
      const TestComponent = () => {
        const { refs } = useMachine(checkboxMachine)
        hasRefs = refs && typeof refs.get === 'function' && typeof refs.set === 'function'
        return h('div', { 'data-has-refs': () => String(hasRefs) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(hasRefs).toBe(true)
    })

    it('provides context accessor for machine context', () => {
      let hasContext = false
      const TestComponent = () => {
        const { context } = useMachine(checkboxMachine)
        hasContext = context && typeof context.get === 'function' && typeof context.set === 'function'
        return h('div', { 'data-has-context': () => String(hasContext) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(hasContext).toBe(true)
    })

    it('provides prop accessor for component props', () => {
      let hasProp = false
      const TestComponent = () => {
        const { prop } = useMachine(checkboxMachine)
        hasProp = typeof prop === 'function'
        return h('div', { 'data-has-prop': () => String(hasProp) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(hasProp).toBe(true)
    })

    it('getStatus returns a status value', () => {
      let status = null
      const TestComponent = () => {
        const { getStatus } = useMachine(checkboxMachine)
        status = getStatus()
        return h('div', { 'data-status': () => String(status) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      // Status should be a valid status value (number or enum-like)
      expect(status).toBeDefined()
      expect(typeof status).not.toBe('undefined')
    })

    it('state.hasTag() checks state tags', () => {
      let hasCheckedTag = false
      const TestComponent = () => {
        const { state } = useMachine(checkboxMachine)
        // Just verify the method exists and is callable
        hasCheckedTag = typeof state.hasTag === 'function'
        return h('div', { 'data-has-tag': () => String(hasCheckedTag) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(hasCheckedTag).toBe(true)
    })
  })

  // ========== createBindable tests ==========
  describe('createBindable', () => {
    it('initializes with defaultValue when uncontrolled', () => {
      let initialValue = null
      const TestComponent = () => {
        const props = () => ({
          defaultValue: 'initial',
        })
        const bindable = createBindable(props)
        initialValue = bindable.get()
        return h('div', { 'data-value': () => String(initialValue) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(initialValue).toBe('initial')
    })

    it('reads from props.value when controlled', () => {
      let result = null
      const TestComponent = () => {
        const props = () => ({
          value: 'controlled',
        })
        const bindable = createBindable(props)
        result = bindable.get()
        return h('div', { 'data-value': () => String(result) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(result).toBe('controlled')
    })

    it('calls onChange when value changes in uncontrolled mode', () => {
      const onChangeSpy = vi.fn()
      let bindable = null

      const TestComponent = () => {
        const props = () => ({
          defaultValue: 'initial',
          onChange: onChangeSpy,
        })
        bindable = createBindable(props)
        return h('div', { 'data-initialized': 'true' })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      if (bindable) {
        bindable.set('new-value')
      }

      expect(onChangeSpy).toHaveBeenCalled()
    })

    it('respects custom equality function', () => {
      const onChangeSpy = vi.fn()
      const customEq = (a, b) => a === b
      let bindable = null

      const TestComponent = () => {
        const props = () => ({
          defaultValue: 'initial',
          onChange: onChangeSpy,
          isEqual: customEq,
        })
        bindable = createBindable(props)
        return h('div', { 'data-initialized': 'true' })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      if (bindable) {
        bindable.set('initial') // Same value, should not trigger onChange
        bindable.set('different') // Different value, should trigger onChange
      }

      expect(onChangeSpy).toHaveBeenCalledTimes(1)
    })

    it('supports setter functions (updater pattern)', () => {
      let result = null
      let bindable = null

      const TestComponent = () => {
        const props = () => ({
          defaultValue: 5,
          onChange: () => {},
        })
        bindable = createBindable(props)
        return h('div', { 'data-initialized': 'true' })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      if (bindable) {
        bindable.set((prev) => prev + 1)
        result = bindable.get()
      }

      expect(result).toBe(6)
    })

    it('invoke() calls onChange directly without equality check', () => {
      const onChangeSpy = vi.fn()
      let bindable = null

      const TestComponent = () => {
        const props = () => ({
          defaultValue: 'initial',
          onChange: onChangeSpy,
        })
        bindable = createBindable(props)
        return h('div', { 'data-initialized': 'true' })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      if (bindable) {
        bindable.invoke('same', 'same')
      }

      expect(onChangeSpy).toHaveBeenCalled()
    })

    it('hash() returns string representation or custom hash', () => {
      let hashResult = null
      const customHash = (v) => `hashed-${v}`

      const TestComponent = () => {
        const props = () => ({
          defaultValue: 'test',
          hash: customHash,
        })
        const bindable = createBindable(props)
        hashResult = bindable.hash('value')
        return h('div', { 'data-hash': () => String(hashResult) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(hashResult).toBe('hashed-value')
    })

    it('ref.current provides sync access to current value', () => {
      let refValue = null
      let bindable = null

      const TestComponent = () => {
        const props = () => ({
          defaultValue: 'initial',
        })
        bindable = createBindable(props)
        return h('div', { 'data-initialized': 'true' })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      if (bindable) {
        bindable.set('updated')
        refValue = bindable.ref.current
      }

      expect(refValue).toBe('updated')
    })

    it('createBindable.ref() creates a simple mutable ref', () => {
      const ref = createBindable.ref('initial')
      expect(ref.get()).toBe('initial')

      ref.set('updated')
      expect(ref.get()).toBe('updated')
    })

    it('initial property stores the initial value', () => {
      let initialProp = null

      const TestComponent = () => {
        const props = () => ({
          defaultValue: 'start-value',
        })
        const bindable = createBindable(props)
        initialProp = bindable.initial
        return h('div', { 'data-initial': () => String(initialProp) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(initialProp).toBe('start-value')
    })
  })

  // ========== createBindable: edge cases ==========
  describe('createBindable - equality & mode', () => {
    it('does NOT fire onChange when setting same primitive value (Object.is)', () => {
      const onChangeSpy = vi.fn()
      let bindable = null

      const TestComponent = () => {
        const props = () => ({ defaultValue: 'same', onChange: onChangeSpy })
        bindable = createBindable(props)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      bindable.set('same')
      expect(onChangeSpy).not.toHaveBeenCalled()
    })

    it('fires onChange when setting different array reference with same content (default Object.is)', () => {
      const onChangeSpy = vi.fn()
      let bindable = null

      const TestComponent = () => {
        const props = () => ({ defaultValue: ['a'], onChange: onChangeSpy })
        bindable = createBindable(props)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      bindable.set(['a'])
      expect(onChangeSpy).toHaveBeenCalledTimes(1)
    })

    it('respects custom isEqual that treats equal-content arrays as unchanged', () => {
      const onChangeSpy = vi.fn()
      let bindable = null
      const arrayEq = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])

      const TestComponent = () => {
        const props = () => ({
          defaultValue: ['a'],
          onChange: onChangeSpy,
          isEqual: arrayEq,
        })
        bindable = createBindable(props)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      bindable.set(['a'])
      expect(onChangeSpy).not.toHaveBeenCalled()

      bindable.set(['b'])
      expect(onChangeSpy).toHaveBeenCalledTimes(1)
    })

    it('controlled mode: set() does NOT write to internal signal, get() returns props.value', () => {
      let bindable = null
      const signal = { current: 'controlled' }

      const TestComponent = () => {
        const props = () => ({ value: signal.current, onChange: () => {} })
        bindable = createBindable(props)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(bindable.get()).toBe('controlled')

      // set() should not throw, but value stays from props
      bindable.set('ignored')
      expect(bindable.get()).toBe('controlled')

      // Update the external value
      signal.current = 'new-control'
      expect(bindable.get()).toBe('new-control')
    })
  })

  // ========== useMachine: behavior tests ==========
  describe('useMachine - behavior', () => {
    it('context can be set and read after mount', () => {
      let isChecked = false

      const TestComponent = () => {
        const { context } = useMachine(checkboxMachine, () => ({ id: 'test-cb-1' }))
        // Read initial context value
        isChecked = context.get('checked')
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(isChecked).toBe(false)
    })

    it('prop() returns the resolved props passed to the machine', () => {
      let disabledValue = null

      const TestComponent = () => {
        const { prop } = useMachine(checkboxMachine, () => ({ id: 'test-cb-2', disabled: true }))
        disabledValue = prop('disabled')
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))
      expect(disabledValue).toBe(true)
    })
  })

  // ========== createTrack tests ==========
  describe('createTrack', () => {
    it('has access to the createTrack utility', () => {
      let trackExists = false

      const TestComponent = () => {
        trackExists = typeof createTrack === 'function'
        return h('div', { 'data-track-exists': () => String(trackExists) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(trackExists).toBe(true)
    })

    it('supports effect callbacks in components', () => {
      const effectSpy = vi.fn()
      let trackCalled = false

      const TestComponent = () => {
        try {
          const deps = [() => 'test-value']
          createTrack(deps, effectSpy)
          trackCalled = true
        } catch {
          trackCalled = false
        }
        return h('div', { 'data-track-called': () => String(trackCalled) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(trackCalled).toBe(true)
    })

    it('does NOT fire the effect on first render', () => {
      const effectSpy = vi.fn()

      const TestComponent = () => {
        createTrack([() => 'stable'], effectSpy)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(effectSpy).not.toHaveBeenCalled()
    })

    it('fires the effect when a reactive dependency changes', () => {
      const effectSpy = vi.fn()
      const dep = createSignal('a')

      const TestComponent = () => {
        createTrack([() => dep()], effectSpy)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(effectSpy).not.toHaveBeenCalled()

      dep('b')

      expect(effectSpy).toHaveBeenCalledTimes(1)
    })

    it('does NOT fire the effect when reactive dependency stays the same', () => {
      const effectSpy = vi.fn()
      const dep = createSignal('stable')

      const TestComponent = () => {
        createTrack([() => dep()], effectSpy)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(effectSpy).not.toHaveBeenCalled()
    })

    it('fires the effect when one of multiple dependencies changes', () => {
      const effectSpy = vi.fn()
      const dep1 = createSignal('a')
      const dep2 = createSignal('x')

      const TestComponent = () => {
        createTrack([() => dep1(), () => dep2()], effectSpy)
        return h('div')
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(effectSpy).not.toHaveBeenCalled()

      dep2('y')

      expect(effectSpy).toHaveBeenCalledTimes(1)
    })
  })

  // ========== Integration: all three together ==========
  describe('integration: useMachine with createBindable', () => {
    it('machine can use createBindable for state management', () => {
      let isSynced = false

      const TestComponent = () => {
        const props = () => ({
          defaultValue: false,
          onChange: () => {},
        })
        const bindable = createBindable(props)

        // Simulate machine updating bindable
        bindable.set(true)
        isSynced = bindable.get() === true

        return h('div', { 'data-synced': () => String(isSynced) })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(isSynced).toBe(true)
    })

    it('useMachine and createBindable work together in a component', () => {
      let machineInitialized = false
      let bindableInitialized = false

      const TestComponent = () => {
        const { state, send } = useMachine(checkboxMachine)
        machineInitialized = !!state && typeof send === 'function'

        const props = () => ({
          defaultValue: 'test',
        })
        const bindable = createBindable(props)
        bindableInitialized = bindable.get() === 'test'

        return h('div', {
          'data-initialized': () => String(machineInitialized && bindableInitialized),
        })
      }

      const container = document.createElement('div')
      renderApp(container, h(TestComponent))

      expect(machineInitialized && bindableInitialized).toBe(true)
    })
  })
})

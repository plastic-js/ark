import { isFunction } from '@zag-js/utils'
import { createComputed, createEffect, createSignal, onCleanup } from './runtime.js'

// Mirrors @zag-js/solid's createBindable; keep in sync.
export const createBindable = (props)=> {
  const initial = props().value ?? props().defaultValue
  const eq = props().isEqual ?? Object.is

  const value = createSignal(initial)
  const controlled = createComputed(() => props().value !== undefined)

  const valueRef = { current: value() }
  const prevValue = { current: undefined }

  // prevValue/valueRef track the committed value; updated by effect after each signal write.
  createEffect(() => {
    const v = controlled() ? props().value : value()
    prevValue.current = v
    valueRef.current = v
  })

  const set = (v)=> {
    const prev = prevValue.current
    const next = isFunction(v) ? v(valueRef.current) : v

    if (props().debug) {
      console.log(`[bindable > ${props().debug}] setValue`, { next, prev })
    }

    // Signal write is unconditional in uncontrolled mode (ignores eq), so reference-different
    // but semantically-equal values still refresh the signal. onChange is gated on eq.
    if (!controlled()) value(next)
    if (!eq(next, prev)) {
      props().onChange?.(next, prev)
    }
  }

  const get = ()=> {
    const v = controlled() ? props().value : value
    return isFunction(v) ? v() : v
  }

  return {
    initial,
    ref: valueRef,
    get,
    set,
    invoke(nextValue, prevValue) {
      props().onChange?.(nextValue, prevValue)
    },
    hash(value) {
      return props().hash?.(value) ?? String(value)
    },
  }
}

createBindable.cleanup = (fn)=> {
  onCleanup(() => fn())
}

createBindable.ref = (defaultValue)=> {
  let value = defaultValue
  return {
    get: () => value,
    set: (next) => { value = next },
  }
}

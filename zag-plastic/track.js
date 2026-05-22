import { isEqual, isFunction } from '@zag-js/utils'
import { createEffect } from './runtime.js'

// Access a value: invoke if function, otherwise return as-is.
const access = (v)=> (isFunction(v) ? v() : v)

/**
 * Dependency-tracking utility: runs an effect when any dependency changes (like useEffect).
 *
 * On first run, captures dependency values without running the effect.
 * On subsequent runs, compares current deps to previous; if any differ, re-runs the effect.
 *
 * Invariants:
 * - effect is NOT run on the first render; only when deps change or component unmounts.
 * - cleanup is NOT supported; use onCleanup directly in your effect if needed.
 * - deps can be functions (accessors) or values; functions are invoked to get the current value.
 * - Cleanup happens automatically on unmount via the underlying createEffect.
 *
 * @param {Array<function|*>} deps - Dependency array; functions are treated as accessors.
 * @param {function} effect - Callback to run when deps change.
 */
export const createTrack = (deps, effect)=> {
  let prevDeps = []
  let isFirstRun = true
  createEffect(()=> {
    if (isFirstRun) {
      prevDeps = deps.map((d) => access(d))
      isFirstRun = false
      return
    }
    let changed = false
    for (let i = 0; i < deps.length; i++) {
      if (!isEqual(prevDeps[i], access(deps[i]))) {
        changed = true
        break
      }
    }
    if (changed) {
      prevDeps = deps.map((d) => access(d))
      effect()
    }
  })
}

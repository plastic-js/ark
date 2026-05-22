/**
 * Ref container: wraps template/DOM refs for machine use.
 *
 * Stores a dict of refs initialized by the machine.
 * get() / set() provide a safe interface for accessing and updating refs.
 *
 * Invariants:
 * - Ref values are NOT reactively tracked; accessing via get() does not create a dependency.
 * - Refs are mutable and non-reactive; changes do not trigger re-renders.
 * - Keys must exist before calling get(); no automatic initialization.
 *
 * @param {Object} refs - Initial ref dict (e.g., { menuRef: { current: null }, ... })
 * @returns {Object} - { get(key), set(key, value) }
 */
export const createRefs = (refs)=> {
  const ref = { current: refs }
  return {
    // Get a ref by key; returns the ref object (e.g., { current: DOM element }).
    get(key) {
      return ref.current[key]
    },
    // Update a ref value by key.
    set(key, value) {
      ref.current[key] = value
    },
  }
}

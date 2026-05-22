import { createEffect, createSignal } from '../runtime.js'

// Internal utility for overlay components to handle lazyMount / unmountOnExit.
//
// getPresent: () => boolean  — whether the component is currently open/visible
// lazyMount: boolean
//
// Returns the hasMounted signal so the caller can compute `unmounted` inline
// alongside api.open (which may differ from getPresent()'s source).
//
// Usage in each component hook:
//   const hasMounted = usePresenceStrategy(() => service.state.hasTag('open'), machineProps.lazyMount)
//   ...
//   unmounted: !api.open && (!hasMounted() || machineProps.unmountOnExit)
export const usePresenceStrategy = (getPresent, lazyMount = false)=> {
	const hasMounted = createSignal(!lazyMount)

	createEffect(()=> {
		if (getPresent()){ hasMounted(true) }
	})

	return hasMounted
}

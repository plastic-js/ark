import * as collapsible from '@zag-js/collapsible'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
	usePresenceStrategy,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

const accessMaybe = (value)=> {
	const resolved = access(value)
	return typeof resolved === 'function' ? access(resolved) : resolved
}

const splitCollapsibleProps = createSplitProps([
	...collapsible.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const useCollapsible = (props = {})=> {
	const [machineProps, elementProps] = splitCollapsibleProps(props)
	const id = createUniqueId('collapsible')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(collapsible.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		open: accessMaybe(machineProps.open),
		defaultOpen: accessMaybe(machineProps.defaultOpen),
		onOpenChange: (details)=> {
			const onOpenChange = machineProps.onOpenChange
			if (typeof onOpenChange === 'function'){
				const nextOpen = typeof details === 'boolean' ? details : details?.open
				const result = onOpenChange(nextOpen)
				if (typeof result === 'function'){
					result(nextOpen)
				}
			}
		},
	}))

	const hasMounted = usePresenceStrategy(()=> service.state.matches('open') || service.state.matches('closing'), machineProps.lazyMount)

	return createComputed(()=> {
		const api = collapsible.connect(service, normalizeProps)
		return {
			...api,
			unmounted: !api.visible && (!hasMounted() || machineProps.unmountOnExit),
			getRootProps: ()=> mergeProps(api.getRootProps(), elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				'data-state': api.open ? 'open' : 'closed',
				'data-disabled': dataAttr(Boolean(machineProps.disabled)),
				children: machineProps.children,
			}),
		}
	})
}

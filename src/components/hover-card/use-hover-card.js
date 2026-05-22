import * as hoverCard from '@zag-js/hover-card'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	mergeProps,
	mergeRefs,
	usePresenceStrategy,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { hoverCardAnatomy } from './hover-card.anatomy.js'

const splitHoverCardProps = createSplitProps([
	...hoverCard.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const useHoverCard = (props = {})=> {
	const [machineProps, elementProps] = splitHoverCardProps(props)
	const id = createUniqueId('hover-card')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const anatomy = hoverCardAnatomy.build()
	const service = useMachine(hoverCard.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		onOpenChange: details=> machineProps.onOpenChange?.(details.open),
	}))

	const hasMounted = usePresenceStrategy(()=> service.state.hasTag('open'), machineProps.lazyMount)

	return createComputed(()=> {
		const api = hoverCard.connect(service, normalizeProps)
		return {
			...api,
			unmounted: !api.open && (!hasMounted() || machineProps.unmountOnExit),
			getRootProps: ()=> mergeProps(elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				'data-state': api.open ? 'open' : 'closed',
				children: machineProps.children,
			}),
		}
	})
}

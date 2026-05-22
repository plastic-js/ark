import * as tooltip from '@zag-js/tooltip'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	mergeProps,
	mergeRefs,
	usePresenceStrategy,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { tooltipAnatomy } from './tooltip.anatomy.js'

const splitTooltipProps = createSplitProps([
	...tooltip.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const useTooltip = (props = {})=> {
	const [machineProps, elementProps] = splitTooltipProps(props)
	const id = createUniqueId('tooltip')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const anatomy = tooltipAnatomy.build()
	const service = useMachine(tooltip.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		onOpenChange: details=> machineProps.onOpenChange?.(details.open),
	}))

	const hasMounted = usePresenceStrategy(()=> service.state.hasTag('open'), machineProps.lazyMount)

	return createComputed(()=> {
		const api = tooltip.connect(service, normalizeProps)
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

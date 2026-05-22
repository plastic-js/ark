import * as tooltip from '@zag-js/tooltip'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { TooltipProvider } from './tooltip-context.js'
import { useTooltip } from './use-tooltip.js'

const splitTooltipProps = createSplitProps([
	...tooltip.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const TooltipRoot = (props = {})=> {
	const [machineProps, elementProps] = splitTooltipProps(props)
	const tooltipApi = useTooltip(machineProps)

	return TooltipProvider({
		value: tooltipApi,
		children: ()=> ark.div(mergeProps(tooltipApi().getRootProps(), elementProps)),
	})
}

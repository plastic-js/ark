import * as popover from '@zag-js/popover'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { PopoverProvider } from './popover-context.js'
import { usePopover } from './use-popover.js'

const splitPopoverProps = createSplitProps([
	...popover.props,
	'disabled',
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const PopoverRoot = (props = {})=> {
	const [machineProps, elementProps] = splitPopoverProps(props)
	const popoverApi = usePopover(machineProps)

	return PopoverProvider({
		value: popoverApi,
		children: ()=> ark.div(mergeProps(popoverApi().getRootProps(), elementProps)),
	})
}

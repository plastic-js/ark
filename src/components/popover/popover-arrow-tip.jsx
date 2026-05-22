import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePopoverContext } from './popover-context.js'

export const PopoverArrowTip = (props = {})=> {
	const popover = usePopoverContext()
	return ark.div(mergeProps(()=> popover().getArrowTipProps(), props))
}

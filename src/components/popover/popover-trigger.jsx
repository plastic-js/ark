import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePopoverContext } from './popover-context.js'

export const PopoverTrigger = (props = {})=> {
	const popover = usePopoverContext()
	return ark.button(mergeProps(()=> popover().getTriggerProps(), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePopoverContext } from './popover-context.js'

export const PopoverTitle = (props = {})=> {
	const popover = usePopoverContext()
	return ark.h2(mergeProps(()=> popover().getTitleProps(), props))
}

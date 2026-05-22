import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTooltipContext } from './tooltip-context.js'

export const TooltipTrigger = (props = {})=> {
	const tooltip = useTooltipContext()
	return ark.button(mergeProps(()=> tooltip().getTriggerProps(), props))
}

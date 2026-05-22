import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTooltipContext } from './tooltip-context.js'

export const TooltipContent = (props = {})=> {
	const tooltip = useTooltipContext()
	return ark.div(mergeProps(()=> tooltip().getContentProps(), props))
}

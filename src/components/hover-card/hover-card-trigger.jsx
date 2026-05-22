import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useHoverCardContext } from './hover-card-context.js'

export const HoverCardTrigger = (props = {})=> {
	const hoverCard = useHoverCardContext()
	return ark.button(mergeProps(()=> hoverCard().getTriggerProps(), props))
}

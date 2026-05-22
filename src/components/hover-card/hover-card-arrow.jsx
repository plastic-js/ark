import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useHoverCardContext } from './hover-card-context.js'

export const HoverCardArrow = (props = {})=> {
	const hoverCard = useHoverCardContext()
	return ark.div(mergeProps(()=> hoverCard().getArrowProps(), props))
}

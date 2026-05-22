import * as hoverCard from '@zag-js/hover-card'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { HoverCardProvider } from './hover-card-context.js'
import { useHoverCard } from './use-hover-card.js'

const splitHoverCardProps = createSplitProps([
	...hoverCard.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const HoverCardRoot = (props = {})=> {
	const [machineProps, elementProps] = splitHoverCardProps(props)
	const hoverCardApi = useHoverCard(machineProps)

	return HoverCardProvider({
		value: hoverCardApi,
		children: ()=> ark.div(mergeProps(hoverCardApi().getRootProps(), elementProps)),
	})
}

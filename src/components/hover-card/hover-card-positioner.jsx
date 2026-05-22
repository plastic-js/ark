import { Either, False, True } from '../../runtime.js'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useHoverCardContext } from './hover-card-context.js'

export const HoverCardPositioner = (props = {})=> {
	const hoverCard = useHoverCardContext()

	return (
		<Either condition={()=> !hoverCard().unmounted}>
			<True>
				{ark.div(mergeProps(()=> hoverCard().getPositionerProps(), props))}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}

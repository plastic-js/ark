import { Either, False, True } from '../../runtime.js'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTooltipContext } from './tooltip-context.js'

export const TooltipPositioner = (props = {})=> {
	const tooltip = useTooltipContext()

	return (
		<Either condition={()=> !tooltip().unmounted}>
			<True>
				{ark.div(mergeProps(()=> tooltip().getPositionerProps(), props))}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}

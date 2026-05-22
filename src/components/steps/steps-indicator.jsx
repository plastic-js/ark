import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useStepsContext } from './steps-context.js'
import { useStepsItemPropsContext } from './steps-item-props-context.js'

export const StepsIndicator = (props = {})=> {
	const stepsApi = useStepsContext()
	const itemProps = useStepsItemPropsContext()
	return ark.div(mergeProps(()=> stepsApi().getIndicatorProps(itemProps()), props))
}

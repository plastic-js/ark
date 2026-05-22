import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useStepsContext } from './steps-context.js'
import { useStepsItemPropsContext } from './steps-item-props-context.js'

export const StepsSeparator = (props = {})=> {
	const stepsApi = useStepsContext()
	const itemProps = useStepsItemPropsContext()
	return ark.div(mergeProps(()=> stepsApi().getSeparatorProps(itemProps()), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useStepsContext } from './steps-context.js'
import { useStepsItemPropsContext } from './steps-item-props-context.js'

export const StepsTrigger = (props = {})=> {
	const stepsApi = useStepsContext()
	const itemProps = useStepsItemPropsContext()
	return ark.button(mergeProps(()=> stepsApi().getTriggerProps(itemProps()), props))
}

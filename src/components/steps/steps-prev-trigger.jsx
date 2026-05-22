import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useStepsContext } from './steps-context.js'

export const StepsPrevTrigger = (props = {})=> {
	const stepsApi = useStepsContext()
	return ark.button(mergeProps(()=> stepsApi().getPrevTriggerProps(), props))
}

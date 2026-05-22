import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useStepsContext } from './steps-context.js'

export const StepsCompletedContent = (props = {})=> {
	const stepsApi = useStepsContext()
	return ark.div(mergeProps(()=> stepsApi().getContentProps({ index: stepsApi().count }), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useStepsContext } from './steps-context.js'

export const StepsList = (props = {})=> {
	const stepsApi = useStepsContext()
	return ark.div(mergeProps(()=> stepsApi().getListProps(), props))
}

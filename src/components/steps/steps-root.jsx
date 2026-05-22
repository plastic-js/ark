import * as steps from '@zag-js/steps'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { StepsProvider } from './steps-context.js'
import { useSteps } from './use-steps.js'

const splitStepsProps = createSplitProps(steps.props)

export const StepsRoot = (props = {})=> {
	const [machineProps, elementProps] = splitStepsProps(props)
	const stepsApi = useSteps(machineProps)

	return StepsProvider({
		value: stepsApi,
		children: ()=> ark.div(mergeProps(()=> stepsApi().getRootProps(), elementProps)),
	})
}

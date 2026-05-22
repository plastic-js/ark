import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useProgressContext } from './progress-context.js'

export const ProgressCircle = (props = {})=> {
	const progress = useProgressContext()
	return ark.svg(mergeProps(()=> progress().getCircleProps(), props))
}

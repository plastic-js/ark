import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useProgressContext } from './progress-context.js'

export const ProgressCircleRange = (props = {})=> {
	const progress = useProgressContext()
	return ark.circle(mergeProps(()=> progress().getCircleRangeProps(), props))
}

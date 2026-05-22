import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useProgressContext } from './progress-context.js'

export const ProgressCircleTrack = (props = {})=> {
	const progress = useProgressContext()
	return ark.circle(mergeProps(()=> progress().getCircleTrackProps(), props))
}

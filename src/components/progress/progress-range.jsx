import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useProgressContext } from './progress-context.js'

export const ProgressRange = (props = {})=> {
	const progress = useProgressContext()
	return ark.div(mergeProps(progress().getRangeProps(), {
		style: ()=> progress().getRangeProps().style,
	}, props))
}

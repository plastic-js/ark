import * as progress from '@zag-js/progress'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ProgressProvider } from './progress-context.js'
import { useProgress } from './use-progress.js'

const splitProgressProps = createSplitProps([
	...progress.props,
	'getValueText',
])

export const ProgressRoot = (props = {})=> {
	const [machineProps, elementProps] = splitProgressProps(props)
	const progressApi = useProgress(machineProps)

	return ProgressProvider({
		value: progressApi,
		children: ()=> ark.div(mergeProps(progressApi().getRootProps(), {
			role: 'progressbar',
			'aria-labelledby': ()=> progressApi().getLabelProps().id,
			'aria-valuemin': ()=> progressApi().min,
			'aria-valuemax': ()=> progressApi().max,
			'aria-valuenow': ()=> progressApi().value,
			'aria-valuetext': ()=> progressApi().valueAsString,
		}, elementProps)),
	})
}

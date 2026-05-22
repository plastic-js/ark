import * as tour from '@zag-js/tour'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { TourProvider } from './tour-context.js'
import { useTour } from './use-tour.js'

const splitTourProps = createSplitProps([
	...tour.props,
	'children',
])

export const TourRoot = (props = {})=> {
	const [machineProps, elementProps] = splitTourProps(props)
	const api = useTour(machineProps)
	return TourProvider({
		value: api,
		children: ()=> {
			api()
			return ark.div(mergeProps(elementProps, {
				children: machineProps.children,
			}))
		},
	})
}

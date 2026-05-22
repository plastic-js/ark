import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitViewProps = createSplitProps(['view'])

export const DatePickerView = (props = {})=> {
	const [viewProps, localProps] = splitViewProps(props)
	const datePicker = useDatePickerContext()
	return ark.div(mergeProps(()=> datePicker().getViewProps({ view: datePicker().view }), localProps))
}

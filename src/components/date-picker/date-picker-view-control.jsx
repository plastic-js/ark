import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitViewControlProps = createSplitProps(['view'])

export const DatePickerViewControl = (props = {})=> {
	const [viewControlProps, localProps] = splitViewControlProps(props)
	const datePicker = useDatePickerContext()
	return ark.div(mergeProps(()=> datePicker().getViewControlProps({ view: datePicker().view }), localProps))
}

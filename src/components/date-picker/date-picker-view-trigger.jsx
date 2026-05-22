import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitViewTriggerProps = createSplitProps(['view'])

export const DatePickerViewTrigger = (props = {})=> {
	const [viewTriggerProps, localProps] = splitViewTriggerProps(props)
	const datePicker = useDatePickerContext()
	return ark.button(mergeProps(()=> datePicker().getViewTriggerProps({ view: viewTriggerProps.view ?? 'day' }), localProps))
}

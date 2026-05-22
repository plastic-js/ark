import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

export const DatePickerContent = (props = {})=> {
	const datePicker = useDatePickerContext()
	return ark.div(mergeProps(()=> datePicker().getContentProps(), props))
}

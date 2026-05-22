import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

export const DatePickerMonthSelect = (props = {})=> {
	const datePicker = useDatePickerContext()
	return ark.select(mergeProps(()=> datePicker().getMonthSelectProps(), props))
}

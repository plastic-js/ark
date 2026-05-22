import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

export const DatePickerCloseTrigger = (props = {})=> {
	const datePicker = useDatePickerContext()
	return ark.button(mergeProps(()=> datePicker().getClearTriggerProps(), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

export const DatePickerRangeText = (props = {})=> {
	const datePicker = useDatePickerContext()
	return ark.span(mergeProps(()=> datePicker().getRangeTextProps(), { children: ()=> datePicker().visibleRangeText?.formatted ?? '' }, props))
}

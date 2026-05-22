import * as datePicker from '@zag-js/date-picker'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { DatePickerProvider } from './date-picker-context.js'
import { useDatePicker } from './use-date-picker.js'

const splitDatePickerProps = createSplitProps(datePicker.props)

export const DatePickerRoot = (props = {})=> {
	const [machineProps, elementProps] = splitDatePickerProps(props)
	const api = useDatePicker(machineProps)
	return DatePickerProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

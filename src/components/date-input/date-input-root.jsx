import * as dateInput from '@zag-js/date-input'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { DateInputProvider } from './date-input-context.js'
import { useDateInput } from './use-date-input.js'

const splitDateInputProps = createSplitProps(dateInput.props)

export const DateInputRoot = (props = {})=> {
	const [machineProps, elementProps] = splitDateInputProps(props)
	const api = useDateInput(machineProps)
	return DateInputProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

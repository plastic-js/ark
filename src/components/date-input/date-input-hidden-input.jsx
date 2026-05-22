import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDateInputContext } from './date-input-context.js'

export const DateInputHiddenInput = (props = {})=> {
	const dateInput = useDateInputContext()
	return ark.input(mergeProps(()=> dateInput().getHiddenInputProps(), props))
}

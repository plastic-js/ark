import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDateInputContext } from './date-input-context.js'

export const DateInputLabel = (props = {})=> {
	const dateInput = useDateInputContext()
	return ark.label(mergeProps(()=> dateInput().getLabelProps(), props))
}

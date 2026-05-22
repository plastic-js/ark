import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDateInputContext } from './date-input-context.js'

export const DateInputSegmentGroup = (props = {})=> {
	const dateInput = useDateInputContext()
	return ark.div(mergeProps(()=> dateInput().getSegmentGroupProps(), props))
}

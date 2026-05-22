import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitWeekNumberCellProps = createSplitProps(['weekIndex', 'week'])

export const DatePickerWeekNumberCell = (props = {})=> {
	const [weekProps, localProps] = splitWeekNumberCellProps(props)
	const datePicker = useDatePickerContext()
	return ark.td(mergeProps(()=> datePicker().getWeekNumberCellProps({ weekIndex: weekProps.weekIndex ?? 0, week: weekProps.week ?? [] }), localProps))
}

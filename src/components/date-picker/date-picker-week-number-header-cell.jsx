import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitWeekNumberHeaderCellProps = createSplitProps(['view'])

export const DatePickerWeekNumberHeaderCell = (props = {})=> {
	const [weekHeaderProps, localProps] = splitWeekNumberHeaderCellProps(props)
	const datePicker = useDatePickerContext()
	return ark.th(mergeProps(()=> datePicker().getWeekNumberHeaderCellProps({ view: weekHeaderProps.view ?? 'day' }), localProps))
}

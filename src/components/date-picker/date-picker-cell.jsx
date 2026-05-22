import { createComputed } from '../../runtime.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitCellProps = createSplitProps(['value', 'disabled', 'visibleRange', 'view', 'columns'])

const getCellPropsByView = (datePicker, props)=> {
	switch (props.view){
		case 'month':
			return datePicker().getMonthTableCellProps(props)
		case 'year':
			return datePicker().getYearTableCellProps(props)
		default:
			return datePicker().getDayTableCellProps(props)
	}
}

export const DatePickerCell = (props = {})=> {
	const [cellProps, localProps] = splitCellProps(props)
	const datePicker = useDatePickerContext()
	// Normalize once so both the memoized zag call and the merged DOM props read
	// the same view/value snapshot for this cell.
	const resolvedCellProps = createComputed(()=> ({
		...cellProps,
		view: cellProps.view ?? 'day',
	}))
	// Cache the connected cell props object for the current reactive inputs so
	// DOM binding reads don't re-run the zag getter once per bound key.
	const cellApiProps = createComputed(()=> getCellPropsByView(datePicker, resolvedCellProps()))
	return ark.td(mergeProps(cellApiProps, localProps))
}

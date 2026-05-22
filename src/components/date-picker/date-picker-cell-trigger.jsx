import { createComputed } from '../../runtime.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitCellTriggerProps = createSplitProps(['value', 'disabled', 'visibleRange', 'view'])

const getCellTriggerPropsByView = (datePicker, props)=> {
	switch (props.view){
		case 'month':
			return datePicker().getMonthTableCellTriggerProps(props)
		case 'year':
			return datePicker().getYearTableCellTriggerProps(props)
		default:
			return datePicker().getDayTableCellTriggerProps(props)
	}
}

export const DatePickerCellTrigger = (props = {})=> {
	const [cellProps, localProps] = splitCellTriggerProps(props)
	const datePicker = useDatePickerContext()
	// Keep one resolved prop object per trigger so the downstream computed can
	// memoize the zag lookup across many DOM key reads.
	const resolvedCellProps = createComputed(()=> ({
		...cellProps,
		view: cellProps.view ?? 'day',
	}))
	// The trigger getter returns a large prop bag; memoize it per cell so the
	// runtime can read many DOM keys without re-connecting on every key access.
	const triggerApiProps = createComputed(()=> getCellTriggerPropsByView(datePicker, resolvedCellProps()))
	return ark.button(mergeProps(triggerApiProps, {
		type: 'button',
		...localProps,
	}))
}

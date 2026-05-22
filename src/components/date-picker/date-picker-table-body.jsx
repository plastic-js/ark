import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitTableBodyProps = createSplitProps(['view', 'columns', 'id'])

export const DatePickerTableBody = (props = {})=> {
	const [tableProps, localProps] = splitTableBodyProps(props)
	const datePicker = useDatePickerContext()
	return ark.tbody(mergeProps(()=> datePicker().getTableBodyProps({
		view: datePicker().view, columns: tableProps.columns, id: tableProps.id,
	}), localProps))
}

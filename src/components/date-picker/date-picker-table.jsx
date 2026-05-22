import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitTableProps = createSplitProps(['view', 'columns', 'id'])

export const DatePickerTable = (props = {})=> {
	const [tableProps, localProps] = splitTableProps(props)
	const datePicker = useDatePickerContext()
	return ark.table(mergeProps(()=> datePicker().getTableProps({
		view: datePicker().view, columns: tableProps.columns, id: tableProps.id,
	}), localProps))
}

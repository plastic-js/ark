import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitTableRowProps = createSplitProps(['view', 'columns', 'id'])

export const DatePickerTableRow = (props = {})=> {
	const [tableProps, localProps] = splitTableRowProps(props)
	const datePicker = useDatePickerContext()
	return ark.tr(mergeProps(()=> datePicker().getTableRowProps({
		view: datePicker().view, columns: tableProps.columns, id: tableProps.id,
	}), localProps))
}

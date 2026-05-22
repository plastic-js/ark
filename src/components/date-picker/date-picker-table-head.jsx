import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitTableHeadProps = createSplitProps(['view', 'columns', 'id'])

export const DatePickerTableHead = (props = {})=> {
	const [tableProps, localProps] = splitTableHeadProps(props)
	const datePicker = useDatePickerContext()
	return ark.thead(mergeProps(()=> datePicker().getTableHeadProps({
		view: datePicker().view, columns: tableProps.columns, id: tableProps.id,
	}), localProps))
}

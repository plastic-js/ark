import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitTableHeaderProps = createSplitProps(['view'])

export const DatePickerTableHeader = (props = {})=> {
	const [tableHeaderProps, localProps] = splitTableHeaderProps(props)
	const datePicker = useDatePickerContext()
	return ark.th(mergeProps(()=> datePicker().getTableHeaderProps({ view: datePicker().view }), localProps))
}

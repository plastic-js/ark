import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitControlProps = createSplitProps(['view'])

export const DatePickerControl = (props = {})=> {
	const [controlProps, localProps] = splitControlProps(props)
	const datePicker = useDatePickerContext()
	return ark.div(mergeProps(()=> datePicker().getControlProps({ view: controlProps.view ?? 'day' }), localProps))
}

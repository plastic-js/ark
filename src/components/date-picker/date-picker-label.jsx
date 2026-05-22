import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitLabelProps = createSplitProps(['index'])

export const DatePickerLabel = (props = {})=> {
	const [labelProps, localProps] = splitLabelProps(props)
	const datePicker = useDatePickerContext()
	return ark.label(mergeProps(()=> datePicker().getLabelProps({ index: labelProps.index ?? 0 }), localProps))
}

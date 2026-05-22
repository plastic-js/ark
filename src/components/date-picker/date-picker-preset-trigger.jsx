import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitPresetTriggerProps = createSplitProps(['value'])

export const DatePickerPresetTrigger = (props = {})=> {
	const [presetProps, localProps] = splitPresetTriggerProps(props)
	const datePicker = useDatePickerContext()
	return ark.button(mergeProps(()=> datePicker().getPresetTriggerProps({ value: presetProps.value }), localProps))
}

import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitNextTriggerProps = createSplitProps(['view'])

export const DatePickerNextTrigger = (props = {})=> {
	const [triggerProps, localProps] = splitNextTriggerProps(props)
	const datePicker = useDatePickerContext()
	return ark.button(mergeProps(()=> datePicker().getNextTriggerProps({ view: datePicker().view }), {
		type: 'button',
		...localProps,
	}))
}

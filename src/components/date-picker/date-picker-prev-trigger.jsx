import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

const splitPrevTriggerProps = createSplitProps(['view'])

export const DatePickerPrevTrigger = (props = {})=> {
	const [triggerProps, localProps] = splitPrevTriggerProps(props)
	const datePicker = useDatePickerContext()
	return ark.button(mergeProps(()=> datePicker().getPrevTriggerProps({ view: datePicker().view }), {
		type: 'button',
		...localProps,
	}))
}

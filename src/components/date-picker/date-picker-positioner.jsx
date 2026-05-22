import { createComputed } from '../../runtime.js'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

export const DatePickerPositioner = (props = {})=> {
	const datePicker = useDatePickerContext()

	let lastStyleStr = ''
	let lastStyle = null

	const stableStyle = createComputed(()=> {
		const rawStyle = datePicker().getPositionerProps().style
		if (rawStyle == null){ return rawStyle }
		const str = JSON.stringify(rawStyle, Object.keys(rawStyle).sort())
		if (str !== lastStyleStr){
			lastStyleStr = str
			lastStyle = rawStyle
		}
		return lastStyle
	})

	const merged = mergeProps(()=> ({
		...datePicker().getPositionerProps(),
		style: stableStyle(),
	}), props)

	return ark.div(merged)
}

import { createEffect } from '../../runtime.js'
import { mergeProps, mergeRefs } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDatePickerContext } from './date-picker-context.js'

export const DatePickerInput = (props = {})=> {
	const datePicker = useDatePickerContext()
	let inputElement = null
	createEffect(()=> {
		const nextValue = datePicker().getDisplayValue()
		if (inputElement && inputElement.value !== nextValue){
			inputElement.value = nextValue
		}
	})
	const inputRef = datePicker().getInputProps().ref
	return ark.input(mergeProps(()=> datePicker().getInputProps(), props, {
		value: ()=> datePicker().getDisplayValue(),
		ref: mergeRefs(inputRef, props.ref, (value)=> {
			inputElement = value
		}),
	}))
}

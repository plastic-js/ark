import { isInternalChangeEvent } from '@zag-js/dom-query'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

const toHexColor = color=> color.toString('hex').toLowerCase()
const getNativeInputId = api=> `${api.getHiddenInputProps().id}-native`

export const ColorPickerInput = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return [
		ark.input(mergeProps(()=> colorPicker().getHiddenInputProps())),
		ark.input(mergeProps({
			id: ()=> getNativeInputId(colorPicker()),
			type: 'color',
			disabled: ()=> colorPicker().getHiddenInputProps().disabled,
			readOnly: ()=> colorPicker().getHiddenInputProps().readOnly,
			required: ()=> colorPicker().getHiddenInputProps().required,
			defaultValue: ()=> toHexColor(colorPicker().value),
			value: ()=> toHexColor(colorPicker().value),
			'aria-label': ()=> colorPicker().getTriggerProps()['aria-label'],
			onInput: (event)=> {
				if (isInternalChangeEvent(event)){ return }
				colorPicker().setValue(event.currentTarget.value)
			},
		}, props)),
	]
}

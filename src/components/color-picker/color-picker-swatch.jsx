import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

const getNativeInputId = api=> `${api.getHiddenInputProps().id}-native`

const openColorInput = (input)=> {
	if (typeof input?.showPicker === 'function'){
		input.showPicker()
		return
	}

	input?.click()
}

export const ColorPickerSwatch = (props = {})=> {
	const api = useColorPickerContext()
	return ark.button(mergeProps({
		'data-scope': 'color-picker',
		'data-part': 'swatch',
		'data-state': 'checked',
		'data-value': ()=> api().valueAsString,
		disabled: ()=> Boolean(api().getHiddenInputProps().disabled),
		type: 'button',
		onClick: ()=> {
			const inputId = getNativeInputId(api())
			openColorInput(document.getElementById(inputId))
		},
		style: ()=> ({
			background: api().valueAsString,
			position: 'relative',
		}),
		'aria-label': ()=> `Select color. Current color is ${api().valueAsString}`,
	}, props))
}

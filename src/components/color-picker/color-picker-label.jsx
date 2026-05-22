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

export const ColorPickerLabel = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return ark.label(mergeProps(()=> colorPicker().getLabelProps(), {
		htmlFor: ()=> getNativeInputId(colorPicker()),
		onClick: ()=> {
			const input = document.getElementById(getNativeInputId(colorPicker()))
			openColorInput(input)
		},
	}, props))
}

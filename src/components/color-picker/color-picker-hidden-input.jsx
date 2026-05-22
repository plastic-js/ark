import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

export const ColorPickerHiddenInput = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return ark.input(mergeProps(()=> colorPicker().getHiddenInputProps(), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

export const ColorPickerControl = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return ark.div(mergeProps(()=> colorPicker().getControlProps(), props))
}

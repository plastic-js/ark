import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

export const ColorPickerEyeDropperTrigger = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return ark.button(mergeProps(()=> colorPicker().getEyeDropperTriggerProps(), props))
}

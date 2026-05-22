import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

export const ColorPickerTrigger = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return ark.button(mergeProps(()=> colorPicker().getTriggerProps(), props))
}

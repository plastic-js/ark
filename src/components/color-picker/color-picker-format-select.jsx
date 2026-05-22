import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

export const ColorPickerFormatSelect = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return ark.select(mergeProps(()=> colorPicker().getFormatSelectProps(), props))
}

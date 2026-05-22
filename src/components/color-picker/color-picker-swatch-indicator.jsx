import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext, useColorPickerSwatchContext } from './color-picker-context.js'

export const ColorPickerSwatchIndicator = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const swatchContext = useColorPickerSwatchContext()
	return ark.div(mergeProps(()=> colorPicker().getSwatchIndicatorProps(swatchContext), props))
}

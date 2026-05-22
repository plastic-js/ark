import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

export const ColorPickerValueSwatch = (props = {})=> {
	const colorPicker = useColorPickerContext()
	return ark.div(mergeProps(()=> colorPicker().getSwatchProps({ value: colorPicker().value }), props))
}

import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { ColorPickerSwatchProvider, useColorPickerContext } from './color-picker-context.js'

const splitSwatchTriggerProps = createSplitProps(['value'])

export const ColorPickerSwatchTrigger = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const [swatchProps, elementProps] = splitSwatchTriggerProps(props)
	return ColorPickerSwatchProvider({
		value: swatchProps,
		children: ()=> ark.button(mergeProps(()=> colorPicker().getSwatchTriggerProps(swatchProps), elementProps)),
	})
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerChannelSliderContext, useColorPickerContext } from './color-picker-context.js'

export const ColorPickerChannelSliderLabel = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const sliderContext = useColorPickerChannelSliderContext()
	return ark.label(mergeProps(()=> colorPicker().getChannelSliderLabelProps(sliderContext), props))
}

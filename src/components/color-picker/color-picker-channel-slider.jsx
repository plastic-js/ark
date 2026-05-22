import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { ColorPickerChannelSliderProvider, useColorPickerContext } from './color-picker-context.js'

const splitChannelSliderProps = createSplitProps(['channel', 'orientation', 'format'])

export const ColorPickerChannelSlider = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const [sliderProps, elementProps] = splitChannelSliderProps(props)
	return ColorPickerChannelSliderProvider({
		value: sliderProps,
		children: ()=> ark.div(mergeProps(()=> colorPicker().getChannelSliderProps(sliderProps), elementProps)),
	})
}

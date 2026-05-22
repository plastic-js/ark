import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerChannelSliderContext, useColorPickerContext } from './color-picker-context.js'

export const ColorPickerChannelSliderTrack = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const sliderContext = useColorPickerChannelSliderContext()
	return ark.div(mergeProps(()=> colorPicker().getChannelSliderTrackProps(sliderContext), props))
}

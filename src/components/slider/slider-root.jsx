import * as slider from '@zag-js/slider'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { SliderProvider } from './slider-context.js'
import { useSlider } from './use-slider.js'

const splitSliderProps = createSplitProps([
	...slider.props,
	'getValueText',
	'rootRef',
	'asChild',
	'children',
])

export const SliderRoot = (props = {})=> {
	const [machineProps, elementProps] = splitSliderProps(props)
	const sliderApi = useSlider(machineProps)
	return SliderProvider({
		value: sliderApi,
		children: ()=> ark.div(mergeProps(()=> sliderApi().getRootProps(), elementProps)),
	})
}

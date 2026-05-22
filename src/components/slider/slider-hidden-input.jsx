import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { sliderAnatomy } from './slider.anatomy.js'
import { useSliderContext } from './slider-context.js'

export const SliderHiddenInput = (props = {})=> {
	const slider = useSliderContext()
	const anatomy = sliderAnatomy.build()
	return ark.input(mergeProps(()=> slider().getHiddenInputProps(props), anatomy.hiddenInput.attrs, props))
}

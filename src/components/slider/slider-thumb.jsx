import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSliderContext } from './slider-context.js'

export const SliderThumb = (props = {})=> {
	const slider = useSliderContext()
	return ark.button(mergeProps(()=> slider().getThumbProps(props), props))
}

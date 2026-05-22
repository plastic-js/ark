import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSliderContext } from './slider-context.js'

export const SliderLabel = (props = {})=> {
	const slider = useSliderContext()
	return ark.label(mergeProps(()=> slider().getLabelProps(), props))
}

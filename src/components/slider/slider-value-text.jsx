import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSliderContext } from './slider-context.js'

export const SliderValueText = (props = {})=> {
	const slider = useSliderContext()
	return ark.div(mergeProps(()=> slider().getValueTextProps(), props))
}

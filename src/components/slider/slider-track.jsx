import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSliderContext } from './slider-context.js'

export const SliderTrack = (props = {})=> {
	const slider = useSliderContext()
	return ark.div(mergeProps(()=> slider().getTrackProps(), props))
}

import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSliderContext } from './slider-context.js'

const splitProps = createSplitProps(['value'])

export const SliderMarker = (props = {})=> {
	const slider = useSliderContext()
	const [localProps, elementProps] = splitProps(props)
	return ark.div(mergeProps(()=> slider().getMarkerProps({ value: localProps.value }), elementProps))
}

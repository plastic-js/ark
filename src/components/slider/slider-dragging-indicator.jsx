import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSliderContext } from './slider-context.js'

const splitProps = createSplitProps(['index'])

export const SliderDraggingIndicator = (props = {})=> {
	const slider = useSliderContext()
	const [localProps, elementProps] = splitProps(props)
	return ark.div(mergeProps(()=> slider().getDraggingIndicatorProps({ index: localProps.index ?? 0 }), elementProps))
}

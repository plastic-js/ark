import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCarouselContext } from './carousel-context.js'

const splitIndicatorProps = createSplitProps(['index', 'readOnly'])

export const CarouselIndicator = (props = {})=> {
	const [indicatorProps, localProps] = splitIndicatorProps(props)
	const carousel = useCarouselContext()
	return ark.button(mergeProps(()=> carousel().getIndicatorProps(indicatorProps), localProps))
}

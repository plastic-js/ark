import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCarouselContext } from './carousel-context.js'

const splitItemProps = createSplitProps(['index', 'snapAlign'])

export const CarouselItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const carousel = useCarouselContext()
	return ark.div(mergeProps(()=> carousel().getItemProps(itemProps), localProps))
}

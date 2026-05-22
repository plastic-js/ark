import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useCarouselContext } from './carousel-context.js'

export const CarouselItemGroup = (props = {})=> {
	const carousel = useCarouselContext()
	return ark.div(mergeProps(()=> carousel().getItemGroupProps(), props))
}

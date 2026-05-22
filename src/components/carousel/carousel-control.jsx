import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useCarouselContext } from './carousel-context.js'

export const CarouselControl = (props = {})=> {
	const carousel = useCarouselContext()
	return ark.div(mergeProps(()=> carousel().getControlProps(), props))
}

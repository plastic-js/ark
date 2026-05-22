import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useCarouselContext } from './carousel-context.js'

export const CarouselPrevTrigger = (props = {})=> {
	const carousel = useCarouselContext()
	return ark.button(mergeProps(()=> carousel().getPrevTriggerProps(), {
		disabled: ()=> !carousel().canScrollPrev,
	}, props))
}

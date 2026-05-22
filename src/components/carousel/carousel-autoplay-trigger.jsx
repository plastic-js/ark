import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useCarouselContext } from './carousel-context.js'

export const CarouselAutoplayTrigger = (props = {})=> {
	const carousel = useCarouselContext()
	return ark.button(mergeProps(()=> carousel().getAutoplayTriggerProps(), props))
}

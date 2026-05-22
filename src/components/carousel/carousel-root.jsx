import * as carousel from '@zag-js/carousel'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { CarouselProvider } from './carousel-context.js'
import { useCarousel } from './use-carousel.js'

const splitCarouselProps = createSplitProps([
	...carousel.props,
	'index',
	'defaultIndex',
	'onIndexChange',
])

export const CarouselRoot = (props = {})=> {
	const [machineProps, elementProps] = splitCarouselProps(props)
	const api = useCarousel(machineProps)
	const mergedProps = mergeProps(()=> api().getRootProps(), {
		'data-index': ()=> String(api().page),
		onKeyDown: (event)=> {
			if (event.defaultPrevented){
				return
			}

			if (event.key === 'ArrowLeft'){
				event.preventDefault()
				api().scrollPrev(true)
			}

			if (event.key === 'ArrowRight'){
				event.preventDefault()
				api().scrollNext(true)
			}

			if (event.key === 'Home'){
				event.preventDefault()
				api().scrollTo(0, true)
			}

			if (event.key === 'End'){
				event.preventDefault()
				api().scrollTo(api().pageSnapPoints.length - 1, true)
			}
		},
	}, elementProps)

	return CarouselProvider({
		value: api,
		children: ()=> ark.div(mergedProps),
	})
}

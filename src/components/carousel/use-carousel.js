import * as carousel from '@zag-js/carousel'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const resolveCarouselProps = (props, id, locale, environment)=> {
	const {
		index,
		defaultIndex,
		onIndexChange,
		onPageChange,
		...machineProps
	} = props
	const page = machineProps.page ?? index
	const defaultPage = machineProps.defaultPage ?? defaultIndex

	return {
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		...page != null ? { page } : {},
		...defaultPage != null ? { defaultPage } : {},
		...onPageChange || onIndexChange
? {
			onPageChange: (details)=> {
				onPageChange?.(details)
				onIndexChange?.(details.page)
			},
		}: {},
	}
}

export const useCarousel = (props = {})=> {
	const id = createUniqueId('carousel')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(carousel.machine, ()=> resolveCarouselProps(props, id, locale, environment))

	return createComputed(()=> carousel.connect(service, normalizeProps))
}

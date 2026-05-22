import { createContext } from '../../utils/index.js'

const [CarouselProvider, useCarouselContext] = createContext({
	strict: false,
	hookName: 'useCarouselContext',
	providerName: '<CarouselProvider />',
	defaultValue: null,
})

export { CarouselProvider, useCarouselContext }

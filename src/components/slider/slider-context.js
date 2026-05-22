import { createContext } from '../../utils/index.js'

const [SliderProvider, useSliderContext] = createContext({
	strict: false,
	hookName: 'useSliderContext',
	providerName: '<SliderProvider />',
	defaultValue: null,
})

export { SliderProvider, useSliderContext }

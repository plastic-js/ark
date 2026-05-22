import { createContext } from '../../utils/index.js'

export const [TourProvider, useTourContext] = createContext({
	hookName: 'useTourContext',
	providerName: '<Tour.Root />',
})

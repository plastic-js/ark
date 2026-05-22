import { createContext } from '../../utils/index.js'

const [ProgressProvider, useProgressContext] = createContext({
	strict: false,
	hookName: 'useProgressContext',
	providerName: '<ProgressProvider />',
	defaultValue: null,
})

export { ProgressProvider, useProgressContext }

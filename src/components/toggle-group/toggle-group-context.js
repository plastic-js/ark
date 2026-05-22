import { createContext } from '../../utils/index.js'

const [ToggleGroupProvider, useToggleGroupContext] = createContext({
	strict: false,
	hookName: 'useToggleGroupContext',
	providerName: '<ToggleGroupProvider />',
	defaultValue: null,
})

export { ToggleGroupProvider, useToggleGroupContext }

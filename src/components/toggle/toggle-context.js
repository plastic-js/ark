import { createContext } from '../../utils/index.js'

const [ToggleProvider, useToggleContext] = createContext({
	strict: false,
	hookName: 'useToggleContext',
	providerName: '<ToggleProvider />',
	defaultValue: null,
})

export { ToggleProvider, useToggleContext }

import { createContext } from '../../utils/index.js'

const [SwitchProvider, useSwitchContext] = createContext({
	strict: false,
	hookName: 'useSwitchContext',
	providerName: '<SwitchProvider />',
	defaultValue: null,
})

export { SwitchProvider, useSwitchContext }

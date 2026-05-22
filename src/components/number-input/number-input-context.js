import { createContext } from '../../utils/index.js'

const [NumberInputProvider, useNumberInputContext] = createContext({
	strict: false,
	hookName: 'useNumberInputContext',
	providerName: '<NumberInputProvider />',
	defaultValue: null,
})

export { NumberInputProvider, useNumberInputContext }

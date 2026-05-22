import { createContext } from '../../utils/index.js'

export const [DateInputProvider, useDateInputContext] = createContext({
	hookName: 'useDateInputContext',
	providerName: '<DateInput.Root />',
})

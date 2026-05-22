import { createContext } from '../../utils/index.js'

export const [ToastProvider, useToastContext] = createContext({
	hookName: 'useToastContext',
	providerName: '<Toast.Root />',
})

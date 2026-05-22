import { createContext } from '../../utils/index.js'

export const [SignaturePadProvider, useSignaturePadContext] = createContext({
	hookName: 'useSignaturePadContext',
	providerName: '<SignaturePad.Root />',
})

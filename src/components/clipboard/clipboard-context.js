import { createContext } from '../../utils/index.js'

const [ClipboardProvider, useClipboardContext] = createContext({
	strict: false,
	hookName: 'useClipboardContext',
	providerName: '<Clipboard.Root />',
	defaultValue: null,
})

export { ClipboardProvider, useClipboardContext }

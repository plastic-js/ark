import { createContext } from '../../utils/index.js'

const [SplitterProvider, useSplitterContext] = createContext({
	strict: false,
	hookName: 'useSplitterContext',
	providerName: '<SplitterProvider />',
	defaultValue: null,
})

export { SplitterProvider, useSplitterContext }

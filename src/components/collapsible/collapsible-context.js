import { createContext } from '../../utils/index.js'

const [CollapsibleProvider, useCollapsibleContext] = createContext({
	strict: false,
	hookName: 'useCollapsibleContext',
	providerName: '<Collapsible.Root />',
	defaultValue: null,
})

export { CollapsibleProvider, useCollapsibleContext }

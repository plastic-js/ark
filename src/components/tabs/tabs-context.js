import { createContext } from '../../utils/index.js'

const [TabsProvider, useTabsContext] = createContext({
	strict: false,
	hookName: 'useTabsContext',
	providerName: '<Tabs.Root />',
	defaultValue: null,
})

export { TabsProvider, useTabsContext }

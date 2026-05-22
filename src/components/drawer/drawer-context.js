import { createContext } from '../../utils/index.js'

const [DrawerProvider, useDrawerContext] = createContext({
	strict: false,
	hookName: 'useDrawerContext',
	providerName: '<Drawer.Root />',
	defaultValue: null,
})

export { DrawerProvider, useDrawerContext }

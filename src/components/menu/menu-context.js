import { createContext } from '../../utils/index.js'

const [MenuProvider, useMenuContext] = createContext({
	strict: false,
	hookName: 'useMenuContext',
	providerName: '<MenuProvider />',
	defaultValue: null,
})

const [MenuItemProvider, useMenuItemContext] = createContext({
	strict: false,
	hookName: 'useMenuItemContext',
	providerName: '<MenuItemProvider />',
	defaultValue: null,
})

const [MenuGroupProvider, useMenuGroupContext] = createContext({
	strict: false,
	hookName: 'useMenuGroupContext',
	providerName: '<MenuGroupProvider />',
	defaultValue: null,
})

const [MenuOptionItemProvider, useMenuOptionItemContext] = createContext({
	strict: false,
	hookName: 'useMenuOptionItemContext',
	providerName: '<MenuOptionItemProvider />',
	defaultValue: null,
})

export {
	MenuProvider,
	useMenuContext,
	MenuItemProvider,
	useMenuItemContext,
	MenuGroupProvider,
	useMenuGroupContext,
	MenuOptionItemProvider,
	useMenuOptionItemContext,
}

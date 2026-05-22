import { createContext } from '../../utils/index.js'

const [ListboxProvider, useListboxContext] = createContext({
	strict: false,
	hookName: 'useListboxContext',
	providerName: '<ListboxProvider />',
	defaultValue: null,
})

const [ListboxItemProvider, useListboxItemContext] = createContext({
	strict: false,
	hookName: 'useListboxItemContext',
	providerName: '<ListboxItemProvider />',
	defaultValue: null,
})

const [ListboxGroupProvider, useListboxGroupContext] = createContext({
	strict: false,
	hookName: 'useListboxGroupContext',
	providerName: '<ListboxGroupProvider />',
	defaultValue: null,
})

export {
	ListboxProvider,
	useListboxContext,
	ListboxItemProvider,
	useListboxItemContext,
	ListboxGroupProvider,
	useListboxGroupContext,
}

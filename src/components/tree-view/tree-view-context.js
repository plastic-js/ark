import { createContext } from '../../utils/index.js'

const [TreeViewProvider, useTreeViewContext] = createContext({
	strict: false,
	hookName: 'useTreeViewContext',
	providerName: '<TreeViewProvider />',
	defaultValue: null,
})

const [TreeViewNodeProvider, useTreeViewNodeContext] = createContext({
	strict: false,
	hookName: 'useTreeViewNodeContext',
	providerName: '<TreeViewNodeProvider />',
	defaultValue: null,
})

export {
	TreeViewProvider,
	useTreeViewContext,
	TreeViewNodeProvider,
	useTreeViewNodeContext,
}

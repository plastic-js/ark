import { getDocument, getWindow } from '@zag-js/dom-query'
import { createSignal, h } from '../../runtime.js'
import { createContext } from '../../utils/index.js'

// Build a merged environment context, inheriting any getter the `value` object
// does not override from the parent context.
const createEnvironmentContextValue = (parent, value = {})=> {
	let getDocumentFn = ()=> parent.getDocument()
	if (value.getDocument){
		getDocumentFn = ()=> value.getDocument()
	} else if (value.document){
		getDocumentFn = ()=> value.document
	}

	// Use defaultView with a null fallback so missing defaultView falls through
	// to the parent's getWindow rather than the global window object.
	let getWindowFn = ()=> getDocumentFn()?.defaultView ?? parent.getWindow()
	if (value.getWindow){
		getWindowFn = ()=> value.getWindow()
	} else if (value.window){
		getWindowFn = ()=> value.window
	}

	let getRootNode = node=> node?.getRootNode?.() ?? getDocumentFn() ?? parent.getRootNode(node)
	if (value.getRootNode){
		getRootNode = node=> value.getRootNode(node)
	} else if (value.rootNode){
		getRootNode = ()=> value.rootNode
	}

	return {
		getRootNode, getDocument: getDocumentFn, getWindow: getWindowFn,
	}
}

const DEFAULT_ENVIRONMENT = {
	getRootNode: node=> node?.getRootNode?.() ?? (typeof document === 'undefined' ? null : document),
	getDocument: ()=> getDocument(typeof document === 'undefined' ? null : document),
	getWindow: ()=> getWindow(typeof document === 'undefined' ? null : document),
}

const [EnvironmentContextProvider, useEnvironmentContext] = createContext({
	strict: false,
	hookName: 'useEnvironmentContext',
	providerName: '<EnvironmentProvider />',
	defaultValue: DEFAULT_ENVIRONMENT,
})

export const EnvironmentProvider = ({ value, children })=> {
	const parentEnvironment = useEnvironmentContext()

	if (value){
		// Explicit value object: inherit missing getters from parent.
		const environment = createEnvironmentContextValue(parentEnvironment, value)
		return EnvironmentContextProvider({ value: environment, children })
	}

	// No explicit value: mount a hidden <span> so getRootNode() reflects the
	// actual root of the component tree — important for Shadow DOM subtrees.
	const spanRef = createSignal(null)

	const getRootNode = (node)=> {
		if (node){ return node.getRootNode() ?? spanRef()?.getRootNode() ?? document }
		return spanRef()?.getRootNode() ?? document
	}

	const environment = {
		getRootNode,
		getDocument: ()=> getDocument(getRootNode()),
		getWindow: ()=> getWindow(getRootNode()),
	}

	return h(EnvironmentContextProvider, { value: environment }, children, h('span', { hidden: true, ref: spanRef }))
}

export { useEnvironmentContext }

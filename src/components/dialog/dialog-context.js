import { createContext } from '../../utils/index.js'

const [DialogProvider, useDialogContext] = createContext({
	strict: false,
	hookName: 'useDialogContext',
	providerName: '<Dialog.Root />',
	defaultValue: null,
})

const [DialogZIndexProvider, useDialogZIndex] = createContext({
	strict: false,
	hookName: 'useDialogZIndex',
	providerName: '<Dialog.Root />',
	defaultValue: null,
})

export {
	DialogProvider, useDialogContext, DialogZIndexProvider, useDialogZIndex,
}

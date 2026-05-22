import { createContext } from '../../utils/index.js'

export const [ComboboxProvider, useComboboxContext] = createContext({
	hookName: 'useComboboxContext',
	providerName: '<Combobox.Root />',
})

export const [ComboboxItemProvider, useComboboxItemContext] = createContext({
	hookName: 'useComboboxItemContext',
	providerName: '<Combobox.Item />',
})

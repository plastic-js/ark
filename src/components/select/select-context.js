import { createContext } from '../../utils/index.js'

export const [SelectProvider, useSelectContext] = createContext({
	hookName: 'useSelectContext',
	providerName: '<Select.Root />',
})

export const [SelectItemProvider, useSelectItemContext] = createContext({
	hookName: 'useSelectItemContext',
	providerName: '<Select.Item />',
})

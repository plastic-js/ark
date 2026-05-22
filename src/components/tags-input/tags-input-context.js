import { createContext } from '../../utils/index.js'

export const [TagsInputProvider, useTagsInputContext] = createContext({
	hookName: 'useTagsInputContext',
	providerName: '<TagsInput.Root />',
})

export const [TagsInputItemProvider, useTagsInputItemContext] = createContext({
	hookName: 'useTagsInputItemContext',
	providerName: '<TagsInput.Item />',
})

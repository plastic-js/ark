import { createContext } from '../../utils/index.js'

const [AvatarProvider, useAvatarContext] = createContext({
	strict: false,
	hookName: 'useAvatarContext',
	providerName: '<Avatar.Root />',
	defaultValue: null,
})

export { AvatarProvider, useAvatarContext }

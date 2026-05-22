import { createContext } from '../../utils/index.js'

const [HoverCardProvider, useHoverCardContext] = createContext({
	strict: false,
	hookName: 'useHoverCardContext',
	providerName: '<HoverCard.Root />',
	defaultValue: null,
})

export { HoverCardProvider, useHoverCardContext }

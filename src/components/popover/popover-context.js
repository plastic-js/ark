import { createContext } from '../../utils/index.js'

const [PopoverProvider, usePopoverContext] = createContext({
	strict: false,
	hookName: 'usePopoverContext',
	providerName: '<Popover.Root />',
	defaultValue: null,
})

export { PopoverProvider, usePopoverContext }

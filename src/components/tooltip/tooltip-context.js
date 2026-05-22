import { createContext } from '../../utils/index.js'

const [TooltipProvider, useTooltipContext] = createContext({
	strict: false,
	hookName: 'useTooltipContext',
	providerName: '<Tooltip.Root />',
	defaultValue: null,
})

export { TooltipProvider, useTooltipContext }

import { createContext } from '../../utils/index.js'

const [StepsProvider, useStepsContext] = createContext({
	strict: false,
	hookName: 'useStepsContext',
	providerName: '<Steps.Root />',
	defaultValue: null,
})

export { StepsProvider, useStepsContext }

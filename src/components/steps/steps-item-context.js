import { createContext } from '../../utils/index.js'

const [StepsItemProvider, useStepsItemContext] = createContext({
	strict: false,
	hookName: 'useStepsItemContext',
	providerName: '<Steps.Item />',
	defaultValue: null,
})

export { StepsItemProvider, useStepsItemContext }

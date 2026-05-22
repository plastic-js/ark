import { createContext } from '../../utils/index.js'

const [StepsItemPropsProvider, useStepsItemPropsContext] = createContext({
	strict: false,
	hookName: 'useStepsItemPropsContext',
	providerName: '<StepsItemPropsProvider />',
	defaultValue: null,
})

export { StepsItemPropsProvider, useStepsItemPropsContext }

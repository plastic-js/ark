import { createContext } from '../../utils/index.js'

const [CheckboxProvider, useCheckboxContext] = createContext({
	strict: false,
	hookName: 'useCheckboxContext',
	providerName: '<Checkbox.Root />',
	defaultValue: null,
})

export { CheckboxProvider, useCheckboxContext }

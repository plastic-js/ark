import { createContext } from '../../utils/index.js'

const [FieldProvider, useFieldContext] = createContext({
	strict: false,
	hookName: 'useFieldContext',
	providerName: '<FieldProvider />',
	defaultValue: null,
})

export { FieldProvider, useFieldContext }

import { createContext } from '../../utils/index.js'

const [FieldsetProvider, useFieldsetContext] = createContext({
	strict: false,
	hookName: 'useFieldsetContext',
	providerName: '<FieldsetProvider />',
	defaultValue: null,
})

export { FieldsetProvider, useFieldsetContext }

import { ark } from '../factory.js'
import { FieldsetProvider } from './fieldset-context.js'
import { useFieldset } from './use-fieldset.js'

export const FieldsetRoot = (props = {})=> {
	const fieldset = useFieldset(props)

	return FieldsetProvider({
		value: fieldset,
		children: ()=> ark.fieldset(fieldset.getRootProps()),
	})
}

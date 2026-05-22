import { ark } from '../factory.js'
import { FieldProvider } from './field-context.js'
import { useField } from './use-field.js'

export const FieldRoot = (props = {})=> {
	const field = useField(props)

	return FieldProvider({
		value: field,
		children: ()=> ark.div(field.getRootProps()),
	})
}

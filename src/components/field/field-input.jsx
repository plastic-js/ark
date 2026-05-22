import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldContext } from './field-context.js'

export const FieldInput = (props = {})=> {
	const field = useFieldContext()
	return ark.input(mergeProps(field.getInputProps(), props))
}

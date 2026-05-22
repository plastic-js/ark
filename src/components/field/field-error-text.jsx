import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldContext } from './field-context.js'

export const FieldErrorText = (props = {})=> {
	const field = useFieldContext()
	return ark.div(mergeProps(field.getErrorTextProps(), props))
}

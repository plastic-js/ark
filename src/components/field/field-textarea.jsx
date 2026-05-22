import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldContext } from './field-context.js'

export const FieldTextarea = (props = {})=> {
	const field = useFieldContext()
	return ark.textarea(mergeProps(field.getTextareaProps(), props))
}

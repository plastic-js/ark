import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldContext } from './field-context.js'

export const FieldLabel = (props = {})=> {
	const field = useFieldContext()
	return ark.label(mergeProps(field.getLabelProps(), props))
}

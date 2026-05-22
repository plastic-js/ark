import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldContext } from './field-context.js'

export const FieldRequiredIndicator = (props = {})=> {
	const field = useFieldContext()
	return ark.span(mergeProps(field.getRequiredIndicatorProps(), props))
}

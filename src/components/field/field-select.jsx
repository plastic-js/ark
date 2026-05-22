import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldContext } from './field-context.js'

export const FieldSelect = (props = {})=> {
	const field = useFieldContext()
	return ark.select(mergeProps(field.getSelectProps(), props))
}

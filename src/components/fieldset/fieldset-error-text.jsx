import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldsetContext } from './fieldset-context.js'

export const FieldsetErrorText = (props = {})=> {
	const fieldset = useFieldsetContext()
	return ark.div(mergeProps(fieldset.getErrorTextProps(), props))
}

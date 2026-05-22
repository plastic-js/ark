import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCheckboxContext } from './checkbox-context.js'

export const CheckboxControl = (props = {})=> {
	const checkbox = useCheckboxContext()
	return ark.span(mergeProps(()=> checkbox().getControlProps(), props))
}

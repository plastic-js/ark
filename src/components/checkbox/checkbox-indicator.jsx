import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCheckboxContext } from './checkbox-context.js'

export const CheckboxIndicator = (props = {})=> {
	const checkbox = useCheckboxContext()
	return ark.span(mergeProps(()=> checkbox().getIndicatorProps(), props))
}

import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useRadioGroupContext } from './radio-group-context.js'

export const RadioGroupLabel = (props = {})=> {
	const radioGroup = useRadioGroupContext()
	return ark.div(mergeProps(()=> radioGroup().getLabelProps(), props))
}

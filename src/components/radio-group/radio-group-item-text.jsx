import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useRadioGroupContext, useRadioGroupItemPropsContext } from './radio-group-context.js'

export const RadioGroupItemText = (props = {})=> {
	const radioGroup = useRadioGroupContext()
	const itemProps = useRadioGroupItemPropsContext()
	return ark.span(mergeProps(()=> radioGroup().getItemTextProps(itemProps), props))
}

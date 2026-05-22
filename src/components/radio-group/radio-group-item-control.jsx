import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useRadioGroupContext, useRadioGroupItemPropsContext } from './radio-group-context.js'

export const RadioGroupItemControl = (props = {})=> {
	const radioGroup = useRadioGroupContext()
	const itemProps = useRadioGroupItemPropsContext()
	return ark.div(mergeProps(()=> radioGroup().getItemControlProps(itemProps), props))
}

import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useRadioGroupContext,
	useRadioGroupItemPropsContext,
} from './radio-group-context.js'

export const RadioGroupItemHiddenInput = (props = {})=> {
	const radioGroup = useRadioGroupContext()
	const itemProps = useRadioGroupItemPropsContext()
	return ark.input(mergeProps(()=> radioGroup().getItemHiddenInputProps(itemProps), props))
}

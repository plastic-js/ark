import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCheckboxContext } from './checkbox-context.js'

export const CheckboxHiddenInput = (props = {})=> {
	const checkbox = useCheckboxContext()
	return ark.input(mergeProps(()=> checkbox().getHiddenInputProps(), {
		defaultChecked: undefined,
		checked: ()=> checkbox().checked,
		...props,
	}))
}

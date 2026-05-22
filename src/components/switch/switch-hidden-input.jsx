import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSwitchContext } from './switch-context.js'

export const SwitchHiddenInput = (props = {})=> {
	const switchApi = useSwitchContext()
	return ark.input(mergeProps(()=> switchApi().getHiddenInputProps(), props))
}

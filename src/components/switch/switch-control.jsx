import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSwitchContext } from './switch-context.js'

export const SwitchControl = (props = {})=> {
	const switchApi = useSwitchContext()
	return ark.span(mergeProps(()=> switchApi().getControlProps(), props))
}

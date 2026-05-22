import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSwitchContext } from './switch-context.js'

export const SwitchLabel = (props = {})=> {
	const switchApi = useSwitchContext()
	return ark.span(mergeProps(()=> switchApi().getLabelProps(), props))
}

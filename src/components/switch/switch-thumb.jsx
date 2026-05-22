import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSwitchContext } from './switch-context.js'

export const SwitchThumb = (props = {})=> {
	const switchApi = useSwitchContext()
	return ark.span(mergeProps(()=> switchApi().getThumbProps(), props))
}

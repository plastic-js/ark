import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToastContext } from './toast-context.js'

export const ToastTrigger = (props = {})=> {
	const toast = useToastContext()
	return ark.button(mergeProps(props, {
		onClick: ()=> toast().dismiss(),
	}))
}

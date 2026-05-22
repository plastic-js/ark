import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToastContext } from './toast-context.js'

export const ToastViewport = (props = {})=> {
	const toast = useToastContext()
	return ark.div(mergeProps(()=> toast().getRootProps(), props))
}

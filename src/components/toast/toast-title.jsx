import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToastContext } from './toast-context.js'

export const ToastTitle = (props = {})=> {
	const toast = useToastContext()
	return ark.h2(mergeProps(()=> toast().getTitleProps(), props))
}

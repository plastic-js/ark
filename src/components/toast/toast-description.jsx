import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToastContext } from './toast-context.js'

export const ToastDescription = (props = {})=> {
	const toast = useToastContext()
	return ark.p(mergeProps(()=> toast().getDescriptionProps(), props))
}

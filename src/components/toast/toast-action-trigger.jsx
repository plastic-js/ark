import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToastContext } from './toast-context.js'

export const ToastActionTrigger = (props = {})=> {
	const toast = useToastContext()
	return ark.button(mergeProps(()=> toast().getActionTriggerProps(), props))
}

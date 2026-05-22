import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToastContext } from './toast-context.js'

export const ToastRoot = (props = {})=> {
	const toast = useToastContext()
	const ghostBefore = ark.div(mergeProps(()=> toast().getGhostBeforeProps()))
	const ghostAfter = ark.div(mergeProps(()=> toast().getGhostAfterProps()))
	return ark.div(mergeProps(()=> toast().getRootProps(), props, {
		children: [ghostBefore, props.children, ghostAfter],
	}))
}

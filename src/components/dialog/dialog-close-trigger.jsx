import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDialogContext } from './dialog-context.js'

export const DialogCloseTrigger = (props = {})=> {
	const dialog = useDialogContext()
	return ark.button(mergeProps(()=> dialog().getCloseTriggerProps(), props))
}

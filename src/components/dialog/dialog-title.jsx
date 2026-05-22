import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDialogContext } from './dialog-context.js'

export const DialogTitle = (props = {})=> {
	const dialog = useDialogContext()
	return ark.h2(mergeProps(()=> dialog().getTitleProps(), props))
}

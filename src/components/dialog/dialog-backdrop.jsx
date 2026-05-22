import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDialogContext, useDialogZIndex } from './dialog-context.js'

export const DialogBackdrop = (props = {})=> {
	const dialog = useDialogContext()
	const zIndex = useDialogZIndex()
	const zIndexStyle = ()=> zIndex != null ? { style: { zIndex } } : {}
	return ark.div(mergeProps(()=> dialog().getBackdropProps(), zIndexStyle, props))
}

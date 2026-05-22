import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDialogContext } from './dialog-context.js'

export const DialogContent = (props = {})=> {
	const dialog = useDialogContext()
	// In modal mode, Zag sets pointer-events:auto directly on the DOM element via
	// assignPointerEventToLayers(). Plastic's style binding dispose can wipe that
	// direct write. Routing pointer-events through the prop system guarantees it
	// survives every reactive update cycle.
	const modalStyle = ()=> ({ pointerEvents: dialog().open ? 'auto' : undefined })
	return ark.div(mergeProps(()=> dialog().getContentProps(), { style: modalStyle }, props))
}

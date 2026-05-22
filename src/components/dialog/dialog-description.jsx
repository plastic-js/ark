import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDialogContext } from './dialog-context.js'

export const DialogDescription = (props = {})=> {
	const dialog = useDialogContext()
	return ark.p(mergeProps(()=> dialog().getDescriptionProps(), props))
}

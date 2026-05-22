import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSignaturePadContext } from './signature-pad-context.js'

export const SignaturePadClearTrigger = (props = {})=> {
	const signaturePad = useSignaturePadContext()
	return ark.button(mergeProps(signaturePad().getClearTriggerProps(), props))
}

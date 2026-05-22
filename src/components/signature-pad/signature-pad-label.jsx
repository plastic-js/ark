import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSignaturePadContext } from './signature-pad-context.js'

export const SignaturePadLabel = (props = {})=> {
	const signaturePad = useSignaturePadContext()
	return ark.label(mergeProps(()=> signaturePad().getLabelProps(), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSignaturePadContext } from './signature-pad-context.js'

export const SignaturePadGuide = (props = {})=> {
	const signaturePad = useSignaturePadContext()
	return ark.div(mergeProps(()=> signaturePad().getGuideProps(), props))
}

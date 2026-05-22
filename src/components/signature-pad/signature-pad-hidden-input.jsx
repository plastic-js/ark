import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSignaturePadContext } from './signature-pad-context.js'

const splitProps = createSplitProps(['value'])

export const SignaturePadHiddenInput = (props = {})=> {
	const signaturePad = useSignaturePadContext()
	const [localProps, elementProps] = splitProps(props)
	return ark.input(mergeProps(()=> signaturePad().getHiddenInputProps({ value: localProps.value ?? '' }), elementProps))
}

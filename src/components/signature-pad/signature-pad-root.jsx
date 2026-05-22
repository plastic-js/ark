import * as signaturePad from '@zag-js/signature-pad'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { SignaturePadProvider } from './signature-pad-context.js'
import { useSignaturePad } from './use-signature-pad.js'

const splitSignaturePadProps = createSplitProps(signaturePad.props)

export const SignaturePadRoot = (props = {})=> {
	const [machineProps, elementProps] = splitSignaturePadProps(props)
	const api = useSignaturePad(machineProps)
	return SignaturePadProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

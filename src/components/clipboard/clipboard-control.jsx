import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useClipboardContext } from './clipboard-context.js'

export const ClipboardControl = (props = {})=> {
	const clipboardApi = useClipboardContext()
	return ark.div(mergeProps(()=> clipboardApi().getControlProps(), props))
}

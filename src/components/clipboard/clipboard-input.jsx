import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useClipboardContext } from './clipboard-context.js'

export const ClipboardInput = (props = {})=> {
	const clipboardApi = useClipboardContext()
	return ark.input(mergeProps(()=> clipboardApi().getInputProps(), props))
}

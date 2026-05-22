import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useClipboardContext } from './clipboard-context.js'

export const ClipboardLabel = (props = {})=> {
	const clipboardApi = useClipboardContext()
	return ark.label(mergeProps(()=> clipboardApi().getLabelProps(), props))
}

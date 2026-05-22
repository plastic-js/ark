import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useClipboardContext } from './clipboard-context.js'

export const ClipboardTrigger = (props = {})=> {
	const clipboardApi = useClipboardContext()
	return ark.button(mergeProps(()=> clipboardApi().getTriggerProps(), props))
}

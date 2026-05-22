import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useClipboardContext } from './clipboard-context.js'

export const ClipboardValueText = (props = {})=> {
	const clipboardApi = useClipboardContext()
	const value = props.children ?? clipboardApi().value
	return ark.span(mergeProps(props, { children: ()=> value }))
}

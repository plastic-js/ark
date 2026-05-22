import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useClipboardContext } from './clipboard-context.js'

export const ClipboardIndicator = (props = {})=> {
	const { copied, ...rest } = props
	const clipboardApi = useClipboardContext()
	const indicatorProps = ()=> clipboardApi().getIndicatorProps({ copied: copied ?? clipboardApi().copied })
	return ark.div(mergeProps(indicatorProps, rest))
}

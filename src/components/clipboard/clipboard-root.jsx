import * as clipboard from '@zag-js/clipboard'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ClipboardProvider } from './clipboard-context.js'
import { useClipboard } from './use-clipboard.js'

const splitClipboardProps = createSplitProps(clipboard.props)

export const ClipboardRoot = (props = {})=> {
	const [machineProps, elementProps] = splitClipboardProps(props)
	const clipboardApi = useClipboard(machineProps)

	return ClipboardProvider({
		value: clipboardApi,
		children: ()=> ark.div(mergeProps(()=> clipboardApi().getRootProps(), elementProps)),
	})
}

import * as dialog from '@zag-js/dialog'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { DialogProvider, DialogZIndexProvider } from './dialog-context.js'
import { useDialog } from './use-dialog.js'

const splitDialogProps = createSplitProps([
	...dialog.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

const splitZIndexProp = createSplitProps(['zIndex'])

export const DialogRoot = (props = {})=> {
	const [{ zIndex }, restProps] = splitZIndexProp(props)
	const [machineProps, elementProps] = splitDialogProps(restProps)
	const dialogApi = useDialog(machineProps)
	return DialogZIndexProvider({
		value: zIndex ?? null,
		children: ()=> DialogProvider({
			value: dialogApi,
			children: ()=> ark.div(mergeProps(dialogApi().getRootProps(), elementProps)),
		}),
	})
}

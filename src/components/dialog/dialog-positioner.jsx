import { Either, False, True } from '../../runtime.js'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDialogContext, useDialogZIndex } from './dialog-context.js'

export const DialogPositioner = (props = {})=> {
	const dialog = useDialogContext()
	const zIndex = useDialogZIndex()
	const zIndexStyle = ()=> zIndex != null ? { style: { zIndex: zIndex + 1 } } : {}

	if (!dialog().lazyMount && !dialog().unmountOnExit){
		return ark.div(mergeProps(()=> dialog().getPositionerProps(), zIndexStyle, props))
	}

	return (
		<Either condition={()=> !dialog().unmounted}>
			<True>
				{ark.div(mergeProps(()=> dialog().getPositionerProps(), zIndexStyle, props))}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}

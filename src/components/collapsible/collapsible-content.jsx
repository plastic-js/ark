import { Either, False, True } from '../../runtime.js'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCollapsibleContext } from './collapsible-context.js'

export const CollapsibleContent = (props = {})=> {
	const collapsible = useCollapsibleContext()

	return (
		<Either condition={()=> !collapsible().unmounted}>
			<True>
				{ark.div(mergeProps(()=> collapsible().getContentProps(), props))}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}

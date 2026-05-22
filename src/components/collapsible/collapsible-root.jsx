import * as collapsible from '@zag-js/collapsible'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { CollapsibleProvider } from './collapsible-context.js'
import { useCollapsible } from './use-collapsible.js'

const splitCollapsibleProps = createSplitProps([
	...collapsible.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const CollapsibleRoot = (props = {})=> {
	const [machineProps, elementProps] = splitCollapsibleProps(props)
	const collapsibleApi = useCollapsible(machineProps)

	return CollapsibleProvider({
		value: collapsibleApi,
		children: ()=> ark.div(mergeProps(collapsibleApi().getRootProps(), elementProps)),
	})
}

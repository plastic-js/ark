import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCollapsibleContext } from './collapsible-context.js'

export const CollapsibleIndicator = (props = {})=> {
	const collapsible = useCollapsibleContext()
	return ark.div(mergeProps(()=> collapsible().getIndicatorProps(), props))
}

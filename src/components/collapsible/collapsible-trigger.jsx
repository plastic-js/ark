import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useCollapsibleContext } from './collapsible-context.js'

export const CollapsibleTrigger = (props = {})=> {
	const collapsible = useCollapsibleContext()
	return ark.button(mergeProps(()=> collapsible().getTriggerProps(), props))
}

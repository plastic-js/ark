import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTabsContext } from './tabs-context.js'

const splitTriggerProps = createSplitProps(['value', 'disabled'])

export const TabsTrigger = (props = {})=> {
	const tabs = useTabsContext()
	const [triggerProps, elementProps] = splitTriggerProps(props)
	return ark.button(mergeProps(()=> tabs().getTriggerProps(triggerProps), elementProps))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTabsContext } from './tabs-context.js'

export const TabsIndicator = (props = {})=> {
	const tabs = useTabsContext()
	return ark.div(mergeProps(()=> tabs().getIndicatorProps(), props))
}

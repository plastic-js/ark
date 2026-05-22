import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTabsContext } from './tabs-context.js'

export const TabsList = (props = {})=> {
	const tabs = useTabsContext()
	return ark.div(mergeProps(()=> tabs().getListProps(), props))
}

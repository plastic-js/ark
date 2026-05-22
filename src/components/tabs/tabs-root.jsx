import * as tabs from '@zag-js/tabs'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { TabsProvider } from './tabs-context.js'
import { useTabs } from './use-tabs.js'

const splitTabsProps = createSplitProps([...tabs.props, 'lazyMount', 'unmountOnExit'])

export const TabsRoot = (props = {})=> {
	const [machineProps, elementProps] = splitTabsProps(props)
	const api = useTabs(machineProps)
	return TabsProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

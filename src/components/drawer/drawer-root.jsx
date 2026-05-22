import * as drawer from '@zag-js/drawer'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { DrawerProvider } from './drawer-context.js'
import { useDrawer } from './use-drawer.js'

const splitDrawerProps = createSplitProps([
	...drawer.props,
	'placement',
	'rootRef',
	'asChild',
	'children',
])

export const DrawerRoot = (props = {})=> {
	const [machineProps, elementProps] = splitDrawerProps(props)
	const drawerApi = useDrawer(machineProps)
	return DrawerProvider({
		value: drawerApi,
		children: ()=> ark.div(mergeProps(drawerApi().getRootProps(), elementProps)),
	})
}

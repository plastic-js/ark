import * as menu from '@zag-js/menu'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { MenuProvider } from './menu-context.js'
import { useMenu } from './use-menu.js'

const splitMenuProps = createSplitProps([
	...menu.props,
	'disabled',
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const MenuRoot = (props = {})=> {
	const [machineProps, elementProps] = splitMenuProps(props)
	const menuApi = useMenu(machineProps)
	return MenuProvider({
		value: menuApi,
		// Pass getRootProps as a thunk so `data-state` etc. track menu signal
		// changes; invoking it eagerly here would freeze the root's attrs at
		// their initial closed-state values.
		children: ()=> ark.div(mergeProps(()=> menuApi().getRootProps(), elementProps)),
	})
}

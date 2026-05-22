import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { MenuGroupProvider, useMenuContext } from './menu-context.js'
import { createUniqueId } from '../../utils/index.js'

const splitGroupProps = createSplitProps(['id', 'children'])

export const MenuRadioItemGroup = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.div(props)
	}
	const [localProps, elementProps] = splitGroupProps(props)
	const groupId = localProps.id ?? createUniqueId('menu-radio-item-group')
	return MenuGroupProvider({
		value: groupId,
		children: ()=> ark.div(mergeProps(menu().getItemGroupProps({ id: groupId }), elementProps, {
			children: localProps.children,
		})),
	})
}

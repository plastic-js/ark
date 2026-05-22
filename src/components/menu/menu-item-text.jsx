import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useMenuContext,
	useMenuItemContext,
} from './menu-context.js'

export const MenuItemText = (props = {})=> {
	const menu = useMenuContext()
	const item = useMenuItemContext()
	if (!menu || !item){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> menu().getItemTextProps(item()), props))
}

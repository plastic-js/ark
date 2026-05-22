import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useMenuContext,
	useMenuGroupContext,
} from './menu-context.js'

export const MenuItemGroupLabel = (props = {})=> {
	const menu = useMenuContext()
	const groupId = useMenuGroupContext()
	if (!menu || !groupId){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> menu().getItemGroupLabelProps({ htmlFor: groupId }), props))
}

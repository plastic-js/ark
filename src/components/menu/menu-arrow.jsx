import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useMenuContext } from './menu-context.js'

export const MenuArrow = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.div(props)
	}
	return ark.div(mergeProps(()=> menu().getArrowProps(), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useMenuContext } from './menu-context.js'

export const MenuSeparator = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.hr(props)
	}
	return ark.hr(mergeProps(()=> menu().getSeparatorProps(), props))
}

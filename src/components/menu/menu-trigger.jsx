import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useMenuContext } from './menu-context.js'

export const MenuTrigger = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.button(props)
	}

	return ark.button(mergeProps(()=> menu().getTriggerProps(), props))
}

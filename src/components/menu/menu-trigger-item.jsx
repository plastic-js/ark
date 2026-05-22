import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useMenuContext } from './menu-context.js'

const splitProps = createSplitProps(['childApi', 'children'])

export const MenuTriggerItem = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.div(props)
	}
	const [localProps, elementProps] = splitProps(props)
	return ark.div(mergeProps(()=> localProps.childApi ? menu().getTriggerItemProps(localProps.childApi) : {}, elementProps, { children: localProps.children }))
}

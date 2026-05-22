import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useMenuContext, useMenuOptionItemContext } from './menu-context.js'

const splitProps = createSplitProps(['value'])

export const MenuItemIndicator = (props = {})=> {
	const menu = useMenuContext()
	const optionItem = useMenuOptionItemContext()
	if (!menu){
		return ark.div(props)
	}
	const [localProps, elementProps] = splitProps(props)
	const value = ()=> localProps.value ?? optionItem?.()?.value
	return ark.div(mergeProps(()=> menu().getItemIndicatorProps({ value: value() }), elementProps))
}

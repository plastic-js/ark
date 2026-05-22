import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { MenuOptionItemProvider, useMenuContext } from './menu-context.js'

const splitProps = createSplitProps(['value', 'valueText', 'checked', 'disabled', 'closeOnSelect', 'onCheckedChange', 'children'])

export const MenuRadioItem = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.div(props)
	}
	const [localProps, elementProps] = splitProps(props)
	const optionProps = {
		type: 'radio',
		value: localProps.value,
		valueText: localProps.valueText,
		checked: localProps.checked,
		disabled: localProps.disabled,
		closeOnSelect: localProps.closeOnSelect,
		onCheckedChange: localProps.onCheckedChange,
	}
	return MenuOptionItemProvider({
		value: ()=> optionProps,
		children: ()=> ark.div(mergeProps(()=> menu().getOptionItemProps(optionProps), elementProps, { children: localProps.children })),
	})
}

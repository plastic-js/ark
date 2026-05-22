import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { MenuItemProvider, useMenuContext } from './menu-context.js'

const splitItemProps = createSplitProps([
	'value',
	'valueText',
	'disabled',
	'closeOnSelect',
	'children',
])

export const MenuItem = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.div(props)
	}

	const [localProps, elementProps] = splitItemProps(props)
	const itemProps = {
		value: localProps.value ?? props['data-value'] ?? props.value,
		valueText: localProps.valueText,
		disabled: localProps.disabled ?? props.disabled ?? (props['data-disabled'] === true || props['data-disabled'] === 'true'),
		closeOnSelect: localProps.closeOnSelect,
	}

	return MenuItemProvider({
		value: ()=> itemProps,
		children: ()=> ark.div(mergeProps(menu().getItemProps(itemProps), {
			onKeyDown: (event)=> {
				if (event.key === 'ArrowDown'){
					event.preventDefault()
					menu().moveFocus(itemProps.value, 1)
					return
				}

				if (event.key === 'ArrowUp'){
					event.preventDefault()
					menu().moveFocus(itemProps.value, -1)
					return
				}

				if (event.key === 'Home'){
					event.preventDefault()
					menu().focusBoundary('first')
					return
				}

				if (event.key === 'End'){
					event.preventDefault()
					menu().focusBoundary('last')
					return
				}

				if (event.key === 'Escape'){
					event.preventDefault()
					menu().closeAndFocusTrigger()
					return
				}

				if (event.key === 'Enter' || event.key === ' '){
					event.preventDefault()
					menu().commitValue(itemProps.value)
					return
				}

				if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey){
					const nextValue = menu().searchValue(event.key, itemProps.value)
					if (nextValue){
						event.preventDefault()
						menu().focusItem(nextValue)
					}
				}
			},
			children: localProps.children,
		}, elementProps)),
	})
}

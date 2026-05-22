import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ListboxItemProvider, useListboxContext } from './listbox-context.js'

const splitItemProps = createSplitProps(['item', 'value', 'children'])

export const ListboxItem = (props = {})=> {
	const listbox = useListboxContext()
	if (!listbox){
		return ark.div(props)
	}

	const [localProps, elementProps] = splitItemProps(props)
	const item = localProps.item ?? listbox().getItemData(localProps.value ?? props.value ?? props['data-value'])
	if (!item){
		return ark.div(props)
	}

	return ListboxItemProvider({
		value: item,
		children: ()=> ark.div(mergeProps(()=> listbox().getItemProps({ item }), elementProps, { children: localProps.children })),
	})
}

ListboxItem.listboxPart = 'item'

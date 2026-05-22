import { ark } from '../factory.js'
import { createSplitProps, createUniqueId, mergeProps } from '../../utils/index.js'
import { listboxAnatomy } from './listbox.anatomy.js'
import { ListboxGroupProvider, useListboxContext } from './listbox-context.js'

const splitGroupProps = createSplitProps(['id', 'children'])

export const ListboxItemGroup = (props = {})=> {
	const listbox = useListboxContext()
	if (!listbox){
		return ark.div(props)
	}

	const anatomy = listboxAnatomy.build()
	const [localProps, elementProps] = splitGroupProps(props)
	const groupId = localProps.id ?? createUniqueId('listbox-item-group')
	const labelId = `${groupId}--label`

	return ListboxGroupProvider({
		value: {
			id: groupId,
			labelId,
		},
		children: ()=> ark.div(mergeProps(listbox().getItemGroupProps({ id: groupId }), anatomy.itemGroup.attrs, elementProps, {
			'aria-labelledby': labelId,
			children: localProps.children,
		})),
	})
}

ListboxItemGroup.listboxPart = 'item-group'

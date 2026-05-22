import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { listboxAnatomy } from './listbox.anatomy.js'
import {
	useListboxContext,
	useListboxGroupContext,
} from './listbox-context.js'

export const ListboxItemGroupLabel = (props = {})=> {
	const listbox = useListboxContext()
	const group = useListboxGroupContext()
	if (!listbox || !group){
		return ark.div(props)
	}

	const anatomy = listboxAnatomy.build()
	return ark.div(mergeProps(()=> listbox().getItemGroupLabelProps({ htmlFor: group.id }), anatomy.itemGroupLabel.attrs, props, {
		id: group.labelId,
	}))
}

ListboxItemGroupLabel.listboxPart = 'item-group-label'

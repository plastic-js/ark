import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useListboxContext,
	useListboxItemContext,
} from './listbox-context.js'

export const ListboxItemText = (props = {})=> {
	const listbox = useListboxContext()
	const item = useListboxItemContext()
	if (!listbox || !item){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> listbox().getItemTextProps({ item }), props))
}

ListboxItemText.listboxPart = 'item-text'

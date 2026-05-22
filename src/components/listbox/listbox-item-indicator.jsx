import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useListboxContext,
	useListboxItemContext,
} from './listbox-context.js'

export const ListboxItemIndicator = (props = {})=> {
	const listbox = useListboxContext()
	const item = useListboxItemContext()
	if (!listbox || !item){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> listbox().getItemIndicatorProps({ item }), props))
}

ListboxItemIndicator.listboxPart = 'item-indicator'

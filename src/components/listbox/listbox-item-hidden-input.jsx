import { ark } from '../factory.js'
import {
	dataAttr,
	mergeProps,
	visuallyHiddenStyle,
} from '../../utils/index.js'
import {
	useListboxContext,
	useListboxItemContext,
} from './listbox-context.js'

export const ListboxItemHiddenInput = (props = {})=> {
	const listbox = useListboxContext()
	const item = useListboxItemContext()
	if (!listbox || !item){
		return ark.input(props)
	}

	const value = listbox().getCollection().getItemValue(item)
	return ark.input(mergeProps({
		'data-scope': 'listbox',
		'data-part': 'item-hidden-input',
		type: ()=> listbox().multiple() ? 'checkbox' : 'radio',
		name: ()=> listbox().name ?? listbox().getRootProps().id,
		value,
		checked: ()=> listbox().value.includes(value),
		disabled: ()=> listbox().getCollection().getItemDisabled(item) || listbox().disabled,
		'data-disabled': ()=> dataAttr(listbox().getCollection().getItemDisabled(item) || listbox().disabled),
		tabIndex: -1,
		'aria-hidden': 'true',
		style: visuallyHiddenStyle,
	}, props))
}

ListboxItemHiddenInput.listboxPart = 'item-hidden-input'

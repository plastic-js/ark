import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useListboxContext } from './listbox-context.js'

export const ListboxContent = (props = {})=> {
	const listbox = useListboxContext()
	if (!listbox){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> listbox().getContentProps(), props))
}

ListboxContent.listboxPart = 'content'

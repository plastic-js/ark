import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useListboxContext } from './listbox-context.js'

export const ListboxLabel = (props = {})=> {
	const listbox = useListboxContext()
	if (!listbox){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> listbox().getLabelProps(), props))
}

ListboxLabel.listboxPart = 'label'

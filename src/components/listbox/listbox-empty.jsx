import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useListboxContext } from './listbox-context.js'

export const ListboxEmpty = (props = {})=> {
	const listbox = useListboxContext()
	return ()=> {
		if (listbox().collection.size !== 0){ return null }
		return ark.div(mergeProps({ 'data-scope': 'listbox', 'data-part': 'empty' }, props))
	}
}

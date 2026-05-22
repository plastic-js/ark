import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useListboxContext } from './listbox-context.js'

export const ListboxValueText = (props = {})=> {
	const listbox = useListboxContext()
	return ark.span(mergeProps(()=> listbox().getValueTextProps(), props))
}

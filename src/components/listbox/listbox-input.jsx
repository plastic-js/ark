import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useListboxContext } from './listbox-context.js'

export const ListboxInput = (props = {})=> {
	const listbox = useListboxContext()
	return ark.input(mergeProps(()=> listbox().getInputProps(), props))
}

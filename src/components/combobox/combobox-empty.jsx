import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useComboboxContext } from './combobox-context.js'

export const ComboboxEmpty = (props = {})=> {
	const combobox = useComboboxContext()
	return ()=> {
		if (combobox().collection.size !== 0){ return null }
		return ark.div(mergeProps({ 'data-scope': 'combobox', 'data-part': 'empty' }, props))
	}
}

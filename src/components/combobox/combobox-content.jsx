import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useComboboxContext } from './combobox-context.js'

export const ComboboxContent = (props = {})=> {
	const combobox = useComboboxContext()
	return ark.div(mergeProps(()=> combobox().getContentProps(), props))
}

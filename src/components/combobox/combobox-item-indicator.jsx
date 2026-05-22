import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useComboboxContext, useComboboxItemContext } from './combobox-context.js'

export const ComboboxItemIndicator = (props = {})=> {
	const combobox = useComboboxContext()
	const item = useComboboxItemContext()
	return ark.div(mergeProps(()=> combobox().getItemIndicatorProps(item), props))
}

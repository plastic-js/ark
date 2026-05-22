import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useComboboxContext } from './combobox-context.js'

export const ComboboxTrigger = (props = {})=> {
	const combobox = useComboboxContext()
	return ark.button(mergeProps(()=> combobox().getTriggerProps(), props))
}

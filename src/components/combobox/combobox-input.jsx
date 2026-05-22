import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useComboboxContext } from './combobox-context.js'

export const ComboboxInput = (props = {})=> {
	const combobox = useComboboxContext()
	return ark.input(mergeProps(()=> combobox().getInputProps(), props))
}

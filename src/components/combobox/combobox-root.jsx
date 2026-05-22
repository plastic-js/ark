import * as combobox from '@zag-js/combobox'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ComboboxProvider } from './combobox-context.js'
import { useCombobox } from './use-combobox.js'

const splitComboboxProps = createSplitProps(combobox.props)

export const ComboboxRoot = (props = {})=> {
	const [machineProps, elementProps] = splitComboboxProps(props)
	const api = useCombobox(machineProps)
	return ComboboxProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

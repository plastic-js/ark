import * as combobox from '@zag-js/combobox'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { ComboboxItemProvider, useComboboxContext } from './combobox-context.js'

const splitItemProps = createSplitProps(combobox.itemProps)

export const ComboboxItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const combobox = useComboboxContext()
	return ComboboxItemProvider({
		value: itemProps,
		children: ()=> ark.div(mergeProps(()=> combobox().getItemProps(itemProps), localProps)),
	})
}

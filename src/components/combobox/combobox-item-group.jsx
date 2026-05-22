import * as combobox from '@zag-js/combobox'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useComboboxContext } from './combobox-context.js'

const splitGroupProps = createSplitProps(combobox.itemGroupProps)

export const ComboboxItemGroup = (props = {})=> {
	const [groupProps, localProps] = splitGroupProps(props)
	const combobox = useComboboxContext()
	return ark.div(mergeProps(()=> combobox().getItemGroupProps(groupProps), localProps))
}

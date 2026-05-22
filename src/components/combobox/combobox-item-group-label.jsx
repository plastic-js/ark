import * as combobox from '@zag-js/combobox'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useComboboxContext } from './combobox-context.js'

const splitGroupLabelProps = createSplitProps(combobox.itemGroupLabelProps)

export const ComboboxItemGroupLabel = (props = {})=> {
	const [groupLabelProps, localProps] = splitGroupLabelProps(props)
	const combobox = useComboboxContext()
	return ark.div(mergeProps(()=> combobox().getItemGroupLabelProps(groupLabelProps), localProps))
}

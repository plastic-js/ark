import * as select from '@zag-js/select'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { SelectItemProvider, useSelectContext } from './select-context.js'

const splitItemProps = createSplitProps(select.itemProps)

export const SelectItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const api = useSelectContext()
	return SelectItemProvider({
		value: ()=> itemProps,
		children: ()=> ark.div(mergeProps(()=> api().getItemProps(itemProps), localProps)),
	})
}

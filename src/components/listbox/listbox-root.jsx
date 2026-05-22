import * as listbox from '@zag-js/listbox'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ListboxProvider } from './listbox-context.js'
import { useListbox } from './use-listbox.js'

const splitListboxProps = createSplitProps([
	...listbox.props,
	'multiple',
	'disabled',
	'name',
	'rootRef',
	'asChild',
	'children',
])

export const ListboxRoot = (props = {})=> {
	const [machineProps, elementProps] = splitListboxProps(props)
	const listboxApi = useListbox(machineProps)
	return ListboxProvider({
		value: listboxApi,
		children: ()=> ark.div(mergeProps(listboxApi().getRootProps(), elementProps)),
	})
}

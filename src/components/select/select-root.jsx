import * as select from '@zag-js/select'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { SelectProvider } from './select-context.js'
import { useSelect } from './use-select.js'

const splitSelectProps = createSplitProps(select.props)

export const SelectRoot = (props = {})=> {
	const [machineProps, elementProps] = splitSelectProps(props)
	const api = useSelect(machineProps)
	return SelectProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

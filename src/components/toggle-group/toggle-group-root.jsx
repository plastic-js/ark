import * as toggleGroup from '@zag-js/toggle-group'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ToggleGroupProvider } from './toggle-group-context.js'
import { useToggleGroup } from './use-toggle-group.js'

const splitToggleGroupProps = createSplitProps(toggleGroup.props)

export const ToggleGroupRoot = (props = {})=> {
	const [machineProps, elementProps] = splitToggleGroupProps(props)
	const toggleGroupApi = useToggleGroup(machineProps)

	return ToggleGroupProvider({
		value: toggleGroupApi,
		children: ()=> ark.div(mergeProps(()=> toggleGroupApi().getRootProps(), elementProps)),
	})
}

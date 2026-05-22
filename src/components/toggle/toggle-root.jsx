import * as toggle from '@zag-js/toggle'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ToggleProvider } from './toggle-context.js'
import { useToggle } from './use-toggle.js'

const splitToggleProps = createSplitProps(toggle.props)

export const ToggleRoot = (props = {})=> {
	const [machineProps, elementProps] = splitToggleProps(props)
	const toggleApi = useToggle(machineProps)

	return ToggleProvider({
		value: toggleApi,
		children: ()=> ark.button(mergeProps(()=> toggleApi().getRootProps(), elementProps)),
	})
}

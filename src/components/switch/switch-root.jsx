import * as switchComponent from '@zag-js/switch'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { SwitchProvider } from './switch-context.js'
import { useSwitch } from './use-switch.js'

const splitSwitchProps = createSplitProps(switchComponent.props)

export const SwitchRoot = (props = {})=> {
	const [machineProps, elementProps] = splitSwitchProps(props)
	const switchApi = useSwitch(machineProps)

	return SwitchProvider({
		value: switchApi,
		children: ()=> ark.label(mergeProps(switchApi().getRootProps(), elementProps)),
	})
}

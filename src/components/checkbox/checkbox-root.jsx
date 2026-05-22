import * as checkbox from '@zag-js/checkbox'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { CheckboxProvider } from './checkbox-context.js'
import { useCheckbox } from './use-checkbox.js'

const splitCheckboxProps = createSplitProps(checkbox.props)

export const CheckboxRoot = (props = {})=> {
	const [machineProps, elementProps] = splitCheckboxProps(props)
	const api = useCheckbox(machineProps)

	return CheckboxProvider({
		value: api,
		children: ()=> ark.label(mergeProps(api().getRootProps(), elementProps)),
	})
}

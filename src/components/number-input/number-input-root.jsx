import * as numberInput from '@zag-js/number-input'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { NumberInputProvider } from './number-input-context.js'
import { useNumberInput } from './use-number-input.js'

const splitNumberInputProps = createSplitProps([
	...numberInput.props,
	'getValueText',
	'rootRef',
	'asChild',
	'children',
])

export const NumberInputRoot = (props = {})=> {
	const [machineProps, elementProps] = splitNumberInputProps(props)
	const numberInputApi = useNumberInput(machineProps)

	return NumberInputProvider({
		value: numberInputApi,
		children: ()=> ark.div(mergeProps(numberInputApi().getRootProps(), elementProps)),
	})
}

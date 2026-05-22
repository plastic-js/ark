import { ark } from '../factory.js'
import { createSplitProps, mergeProps, mergeRefs } from '../../utils/index.js'
import { RadioGroupProvider } from './radio-group-context.js'
import { useRadioGroup } from './use-radio-group.js'

const splitRadioGroupProps = createSplitProps([
	'defaultValue',
	'disabled',
	'form',
	'id',
	'ids',
	'invalid',
	'name',
	'onValueChange',
	'orientation',
	'readOnly',
	'required',
	'value',
])

export const RadioGroupRoot = (props = {})=> {
	const [machineProps, localProps] = splitRadioGroupProps(props)
	const { rootRef, ...elementProps } = localProps
	const radioGroup = useRadioGroup(machineProps)
	const mergedProps = mergeProps(()=> radioGroup().getRootProps(), {
		...elementProps,
		ref: mergeRefs(elementProps.ref, rootRef),
	})

	return RadioGroupProvider({
		value: radioGroup,
		children: ()=> ark.div(mergedProps),
	})
}

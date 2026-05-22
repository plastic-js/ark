import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import {
	RadioGroupItemPropsProvider,
	RadioGroupItemProvider,
	useRadioGroupContext,
} from './radio-group-context.js'

const splitItemProps = createSplitProps(['value', 'disabled', 'invalid'])

export const RadioGroupItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const radioGroup = useRadioGroupContext()
	const itemState = ()=> radioGroup().getItemState(itemProps)
	const mergedProps = mergeProps(()=> radioGroup().getItemProps(itemProps), localProps)

	return RadioGroupItemPropsProvider({
		value: itemProps,
		children: ()=> RadioGroupItemProvider({
			value: itemState,
			children: ()=> ark.label(mergedProps),
		}),
	})
}

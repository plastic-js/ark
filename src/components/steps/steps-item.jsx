import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useStepsContext } from './steps-context.js'
import { StepsItemProvider } from './steps-item-context.js'
import { StepsItemPropsProvider } from './steps-item-props-context.js'

export const StepsItem = (props = {})=> {
	const { index, ...rest } = props
	const stepsApi = useStepsContext()
	const itemProps = ()=> stepsApi().getItemProps({ index })
	const itemState = ()=> stepsApi().getItemState({ index })

	return StepsItemPropsProvider({
		value: ()=> ({ index }),
		children: ()=> StepsItemProvider({
			value: itemState,
			children: ()=> ark.div(mergeProps(itemProps, rest)),
		}),
	})
}

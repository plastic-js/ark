import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { RatingGroupProvider } from './rating-group-context.js'
import { useRatingGroup } from './use-rating-group.js'

const splitRatingGroupProps = createSplitProps([
	'allowHalf',
	'autoFocus',
	'count',
	'defaultValue',
	'disabled',
	'form',
	'id',
	'ids',
	'name',
	'onHoverChange',
	'onValueChange',
	'readOnly',
	'required',
	'translations',
	'value',
])

export const RatingGroupRoot = (props = {})=> {
	const [machineProps, localProps] = splitRatingGroupProps(props)
	const ratingGroup = useRatingGroup(machineProps)
	const mergedProps = mergeProps(()=> ratingGroup().getRootProps(), localProps)
	return RatingGroupProvider({
		value: ratingGroup,
		children: ()=> ark.div(mergedProps),
	})
}

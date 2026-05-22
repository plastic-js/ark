import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import {
	RatingGroupItemPropsProvider,
	RatingGroupItemProvider,
	useRatingGroupContext,
} from './rating-group-context.js'

const splitItemProps = createSplitProps(['index', 'value'])

export const RatingGroupItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const ratingGroup = useRatingGroupContext()
	const resolvedItemProps = {
		...itemProps,
		index: Number(itemProps.index ?? itemProps.value),
	}
	const itemState = ()=> ratingGroup().getItemState(resolvedItemProps)
	const mergedProps = mergeProps(()=> ratingGroup().getItemProps(resolvedItemProps), {
		type: 'button',
		...localProps,
	})

	return RatingGroupItemPropsProvider({
		value: resolvedItemProps,
		children: ()=> RatingGroupItemProvider({
			value: itemState,
			children: ()=> ark.button(mergedProps),
		}),
	})
}

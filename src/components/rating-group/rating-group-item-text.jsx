import { dataAttr } from '../../utils/index.js'
import { ark } from '../factory.js'
import { ratingGroupAnatomy } from './rating-group.anatomy.js'
import {
	useRatingGroupContext,
	useRatingGroupItemPropsContext,
} from './rating-group-context.js'

export const RatingGroupItemText = (props = {})=> {
	const anatomy = ratingGroupAnatomy.build()
	const ratingGroup = useRatingGroupContext()
	const itemProps = useRatingGroupItemPropsContext()
	const itemState = ()=> ratingGroup().getItemState(itemProps)
	return ark.div({
		'data-checked': ()=> dataAttr(itemState().checked),
		'data-highlighted': ()=> dataAttr(itemState().highlighted),
		'data-half': ()=> dataAttr(itemState().half),
		...props,
		...anatomy.itemText.attrs,
	})
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useRatingGroupContext } from './rating-group-context.js'

export const RatingGroupLabel = (props = {})=> {
	const ratingGroup = useRatingGroupContext()
	return ark.div(mergeProps(()=> ratingGroup().getLabelProps(), props))
}

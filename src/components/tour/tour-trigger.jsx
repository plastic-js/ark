import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTourContext } from './tour-context.js'
import { tourAnatomy } from './tour.anatomy.js'

export const TourTrigger = (props = {})=> {
	const tour = useTourContext()
	const anatomy = tourAnatomy.build()
	return ark.button(mergeProps({
		...anatomy.trigger.attrs,
		onClick: ()=> tour().start(),
	}, props))
}

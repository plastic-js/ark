import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTourContext } from './tour-context.js'

export const TourPositioner = (props = {})=> {
	const tour = useTourContext()
	return ark.div(mergeProps(()=> tour().getPositionerProps(), props))
}

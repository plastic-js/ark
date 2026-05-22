import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTourContext } from './tour-context.js'

export const TourDescription = (props = {})=> {
	const tour = useTourContext()
	const mergedProps = mergeProps(()=> tour().getDescriptionProps(), props)
	return ark.p(mergeProps(mergedProps, { children: ()=> tour().step?.description ?? '' }))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTourContext } from './tour-context.js'

export const TourTitle = (props = {})=> {
	const tour = useTourContext()
	const mergedProps = mergeProps(()=> tour().getTitleProps(), props)
	return ark.h2(mergeProps(mergedProps, { children: ()=> tour().step?.title ?? '' }))
}

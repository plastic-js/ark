import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTourContext } from './tour-context.js'

export const TourPrevTrigger = (props = {})=> {
	const tour = useTourContext()
	return ark.button(mergeProps(()=> tour().getActionTriggerProps({ action: { action: 'prev', label: 'prev' } }), props))
}

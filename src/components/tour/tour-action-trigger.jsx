import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTourContext } from './tour-context.js'

const splitProps = createSplitProps(['action'])

export const TourActionTrigger = (props = {})=> {
	const tour = useTourContext()
	const [localProps, elementProps] = splitProps(props)
	return ark.button(mergeProps(()=> tour().getActionTriggerProps({ action: localProps.action }), elementProps))
}

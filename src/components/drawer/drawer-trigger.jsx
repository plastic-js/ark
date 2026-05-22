import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDrawerContext } from './drawer-context.js'

const splitTriggerProps = createSplitProps(['value'])

export const DrawerTrigger = (props = {})=> {
	const [triggerProps, localProps] = splitTriggerProps(props)
	const drawer = useDrawerContext()
	return ark.button(mergeProps(()=> drawer().getTriggerProps(triggerProps), localProps))
}

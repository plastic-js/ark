import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDialogContext } from './dialog-context.js'

const splitTriggerProps = createSplitProps(['value'])

export const DialogTrigger = (props = {})=> {
	const [triggerProps, localProps] = splitTriggerProps(props)
	const dialog = useDialogContext()
	return ark.button(mergeProps(()=> dialog().getTriggerProps(triggerProps), localProps))
}

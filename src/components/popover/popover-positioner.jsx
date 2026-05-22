import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePopoverContext } from './popover-context.js'

// Do NOT gate this with Either on `unmounted`: the condition reads the
// popover computed, so every state transition tears the positioner (and
// its content) down and rebuilds it. Zag's trackDismissableElement raf
// then fires against the stale node and warns "node is `null` or
// `undefined`", and the freshly-rebuilt content never gets wired up.
export const PopoverPositioner = (props = {})=> {
	const popover = usePopoverContext()
	return ark.div(mergeProps(()=> popover().getPositionerProps(), props))
}

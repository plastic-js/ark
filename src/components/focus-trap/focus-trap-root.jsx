import { ark } from '../factory.js'
import { useFocusTrap } from './use-focus-trap.js'

export const FocusTrapRoot = (props = {})=> {
	const focusTrap = useFocusTrap(props)
	return ark.div(focusTrap.getRootProps())
}

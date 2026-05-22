import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useMenuContext } from './menu-context.js'

export const MenuPositioner = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.div(props)
	}
	// Do NOT wrap in a `()=> unmounted ? null : ark.div(...)` thunk: that re-runs
	// on every menu signal change (e.g. highlightedValue on item hover) and
	// rebuilds the positioner element, losing popper's autoUpdate binding and
	// causing the menu to jump.
	return ark.div(mergeProps(()=> menu().getPositionerProps(), props))
}

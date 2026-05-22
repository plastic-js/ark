import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import { useMenuContext } from './menu-context.js'

export const MenuContent = (props = {})=> {
	const menu = useMenuContext()
	if (!menu){
		return ark.div(props)
	}

	// zag's getContentProps sets `hidden` when closed, so we don't need an
	// unmount thunk here. A `()=> ...` wrapper would also defeat reactivity
	// when this Content sits inside Menu.Positioner (the nested-thunk child
	// goes through PENDING_DESCRIPTORS and never materializes).
	return ark.div(mergeProps(()=> menu().getContentProps(), props))
}

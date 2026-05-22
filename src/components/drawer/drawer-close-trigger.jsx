import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDrawerContext } from './drawer-context.js'

export const DrawerCloseTrigger = (props = {})=> {
	const drawer = useDrawerContext()
	return ark.button(mergeProps(()=> drawer().getCloseTriggerProps(), props))
}

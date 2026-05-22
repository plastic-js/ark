import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDrawerContext } from './drawer-context.js'

export const DrawerPositioner = (props = {})=> {
	const drawer = useDrawerContext()
	return ark.div(mergeProps(()=> drawer().getPositionerProps(), props))
}

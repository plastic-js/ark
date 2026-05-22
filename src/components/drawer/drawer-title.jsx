import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDrawerContext } from './drawer-context.js'

export const DrawerTitle = (props = {})=> {
	const drawer = useDrawerContext()
	return ark.h2(mergeProps(()=> drawer().getTitleProps(), props))
}

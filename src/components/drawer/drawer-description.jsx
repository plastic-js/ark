import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDrawerContext } from './drawer-context.js'

export const DrawerDescription = (props = {})=> {
	const drawer = useDrawerContext()
	return ark.p(mergeProps(()=> drawer().getDescriptionProps(), props))
}

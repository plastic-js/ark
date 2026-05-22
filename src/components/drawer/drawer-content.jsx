import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useDrawerContext } from './drawer-context.js'

const splitContentProps = createSplitProps(['draggable'])

export const DrawerContent = (props = {})=> {
	const [contentProps, localProps] = splitContentProps(props)
	const drawer = useDrawerContext()
	return ark.div(mergeProps(()=> drawer().getContentProps({ draggable: true, ...contentProps }), localProps))
}

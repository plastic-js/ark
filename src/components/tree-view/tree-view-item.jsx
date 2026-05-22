import { ark } from '../factory.js'
import { callAll, createSplitProps, mergeProps } from '../../utils/index.js'
import {
	TreeViewNodeProvider,
	useTreeViewContext,
} from './tree-view-context.js'

const splitItemProps = createSplitProps(['children'])

export const TreeViewItem = (props = {})=> {
	const treeView = useTreeViewContext()
	if (!treeView){
		return ark.div(props)
	}

	const [localProps, elementProps] = splitItemProps(props)
	const value = props['data-value'] ?? props.value
	const nodeProps = treeView().getNodeProps(value)
	if (!nodeProps){
		return ark.div(props)
	}

	return TreeViewNodeProvider({
		value: ()=> ({ nodeProps, isBranch: false }),
		children: ()=> {
			const itemProps = treeView().getItemProps(nodeProps)
			const machineOnClick = itemProps.onClick
			const {
				onClick: elementOnClick,
				...elementPropsWithoutOnClick
			} = elementProps
			return ark.div(mergeProps({
				...itemProps,
				onClick: (event)=> {
					callAll(machineOnClick, elementOnClick)?.(event)
					event.currentTarget.focus()
				},
			}, elementPropsWithoutOnClick, { children: localProps.children }))
		},
	})
}

TreeViewItem.treeViewPart = 'item'

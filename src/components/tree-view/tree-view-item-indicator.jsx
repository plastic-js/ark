import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useTreeViewContext,
	useTreeViewNodeContext,
} from './tree-view-context.js'

export const TreeViewItemIndicator = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.button(props)
	}

	return ark.button(mergeProps(()=> treeView().getItemIndicatorProps(nodeContext().nodeProps), props))
}

TreeViewItemIndicator.treeViewPart = 'item-indicator'

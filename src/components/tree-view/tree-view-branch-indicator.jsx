import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useTreeViewContext,
	useTreeViewNodeContext,
} from './tree-view-context.js'

export const TreeViewBranchIndicator = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.span(props)
	}

	return ark.span(mergeProps(()=> treeView().getBranchIndicatorProps(nodeContext().nodeProps), props))
}

TreeViewBranchIndicator.treeViewPart = 'branch-indicator'

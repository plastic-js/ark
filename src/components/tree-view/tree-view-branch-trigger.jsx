import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useTreeViewContext,
	useTreeViewNodeContext,
} from './tree-view-context.js'

export const TreeViewBranchTrigger = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.button(props)
	}

	return ark.button(mergeProps(()=> treeView().getBranchTriggerProps(nodeContext().nodeProps), { onClick: event=> event.stopPropagation() }, props))
}

TreeViewBranchTrigger.treeViewPart = 'branch-trigger'

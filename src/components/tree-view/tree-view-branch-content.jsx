import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useTreeViewContext,
	useTreeViewNodeContext,
} from './tree-view-context.js'

export const TreeViewBranchContent = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> ({
		...treeView().getBranchContentProps(nodeContext().nodeProps),
		hidden: treeView().getBranchContentProps(nodeContext().nodeProps).hidden,
		'data-state': ()=> treeView().getBranchContentProps(nodeContext().nodeProps)['data-state'],
	}), props))
}

TreeViewBranchContent.treeViewPart = 'branch-content'

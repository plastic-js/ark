import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useTreeViewContext,
	useTreeViewNodeContext,
} from './tree-view-context.js'

export const TreeViewBranchIndentGuide = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> treeView().getBranchIndentGuideProps(nodeContext().nodeProps), props))
}

TreeViewBranchIndentGuide.treeViewPart = 'branch-indent-guide'

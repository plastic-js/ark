import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTreeViewContext } from './tree-view-context.js'

export const TreeViewTree = (props = {})=> {
	const treeView = useTreeViewContext()
	if (!treeView){
		return ark.ul(props)
	}
	return ark.ul(mergeProps(()=> treeView().getTreeProps(), props))
}

TreeViewTree.treeViewPart = 'tree'

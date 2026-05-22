import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTreeViewContext, useTreeViewNodeContext } from './tree-view-context.js'

export const TreeViewNodeRenameInput = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.input(props)
	}
	return ark.input(mergeProps(()=> treeView().getNodeRenameInputProps(nodeContext().nodeProps), props))
}

TreeViewNodeRenameInput.treeViewPart = 'node-rename-input'

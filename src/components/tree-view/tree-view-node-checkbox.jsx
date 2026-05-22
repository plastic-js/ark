import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTreeViewContext, useTreeViewNodeContext } from './tree-view-context.js'

export const TreeViewNodeCheckbox = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.div(props)
	}
	return ark.div(mergeProps(()=> treeView().getNodeCheckboxProps(nodeContext().nodeProps), props))
}

TreeViewNodeCheckbox.treeViewPart = 'node-checkbox'

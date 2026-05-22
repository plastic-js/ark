import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTreeViewContext } from './tree-view-context.js'

export const TreeViewLabel = (props = {})=> {
	const treeView = useTreeViewContext()
	if (!treeView){
		return ark.label(props)
	}
	return ark.label(mergeProps(()=> treeView().getLabelProps(), props))
}

TreeViewLabel.treeViewPart = 'label'

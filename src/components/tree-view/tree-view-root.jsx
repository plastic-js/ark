import * as treeView from '@zag-js/tree-view'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { TreeViewProvider } from './tree-view-context.js'
import { useTreeView } from './use-tree-view.js'

const splitTreeViewProps = createSplitProps([
	...treeView.props,
	'id',
	'expanded',
	'defaultExpanded',
	'onExpandedChange',
	'rootRef',
	'asChild',
	'children',
])

export const TreeViewRoot = (props = {})=> {
	const [machineProps, elementProps] = splitTreeViewProps(props)
	const treeViewApi = useTreeView(machineProps)
	return TreeViewProvider({
		value: treeViewApi,
		children: ()=> ark.div(mergeProps(treeViewApi().getRootProps(), elementProps)),
	})
}

TreeViewRoot.treeViewPart = 'root'

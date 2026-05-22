import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import {
	TreeViewNodeProvider,
	useTreeViewContext,
} from './tree-view-context.js'

const splitBranchProps = createSplitProps(['children'])

export const TreeViewBranch = (props = {})=> {
	const treeView = useTreeViewContext()
	if (!treeView){
		return ark.div(props)
	}

	const [localProps, elementProps] = splitBranchProps(props)
	const value = props['data-value'] ?? props.value
	const nodeProps = treeView().getNodeProps(value)
	if (!nodeProps){
		return ark.div(props)
	}

	return TreeViewNodeProvider({
		value: ()=> ({ nodeProps, isBranch: true }),
		children: ()=> ark.div(mergeProps({
			...treeView().getBranchProps(nodeProps),
			'aria-expanded': ()=> treeView().getBranchProps(nodeProps)['aria-expanded'],
			'data-state': ()=> treeView().getBranchProps(nodeProps)['data-state'],
			'data-loading': ()=> treeView().getBranchProps(nodeProps)['data-loading'],
			'aria-busy': ()=> treeView().getBranchProps(nodeProps)['aria-busy'],
			children: localProps.children,
		}, elementProps)),
	})
}

TreeViewBranch.treeViewPart = 'branch'

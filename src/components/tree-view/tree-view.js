import { TreeViewBranch } from './tree-view-branch.jsx'
import { TreeViewBranchContent } from './tree-view-branch-content.jsx'
import { TreeViewBranchControl } from './tree-view-branch-control.jsx'
import { TreeViewBranchIndentGuide } from './tree-view-branch-indent-guide.jsx'
import { TreeViewBranchIndicator } from './tree-view-branch-indicator.jsx'
import { TreeViewBranchText } from './tree-view-branch-text.jsx'
import { TreeViewBranchTrigger } from './tree-view-branch-trigger.jsx'
import { TreeViewItem } from './tree-view-item.jsx'
import { TreeViewItemIndicator } from './tree-view-item-indicator.jsx'
import { TreeViewItemText } from './tree-view-item-text.jsx'
import { TreeViewLabel } from './tree-view-label.jsx'
import { TreeViewNodeCheckbox } from './tree-view-node-checkbox.jsx'
import { TreeViewNodeCheckboxIndicator } from './tree-view-node-checkbox-indicator.jsx'
import { TreeViewNodeRenameInput } from './tree-view-node-rename-input.jsx'
import { TreeViewRoot } from './tree-view-root.jsx'
import { TreeViewTree } from './tree-view-tree.jsx'

const treeViewParts = {
	Root: TreeViewRoot,
	Label: TreeViewLabel,
	Tree: TreeViewTree,
	Item: TreeViewItem,
	ItemText: TreeViewItemText,
	ItemIndicator: TreeViewItemIndicator,
	NodeCheckbox: TreeViewNodeCheckbox,
	NodeCheckboxIndicator: TreeViewNodeCheckboxIndicator,
	NodeRenameInput: TreeViewNodeRenameInput,
	Branch: TreeViewBranch,
	BranchControl: TreeViewBranchControl,
	BranchTrigger: TreeViewBranchTrigger,
	BranchText: TreeViewBranchText,
	BranchIndicator: TreeViewBranchIndicator,
	BranchContent: TreeViewBranchContent,
	BranchIndentGuide: TreeViewBranchIndentGuide,
}

export const TreeView = Object.assign(TreeViewRoot, treeViewParts)
export {
	TreeViewRoot as Root,
	TreeViewLabel as Label,
	TreeViewTree as Tree,
	TreeViewItem as Item,
	TreeViewItemText as ItemText,
	TreeViewItemIndicator as ItemIndicator,
	TreeViewNodeCheckbox as NodeCheckbox,
	TreeViewNodeCheckboxIndicator as NodeCheckboxIndicator,
	TreeViewNodeRenameInput as NodeRenameInput,
	TreeViewBranch as Branch,
	TreeViewBranchControl as BranchControl,
	TreeViewBranchTrigger as BranchTrigger,
	TreeViewBranchText as BranchText,
	TreeViewBranchIndicator as BranchIndicator,
	TreeViewBranchContent as BranchContent,
	TreeViewBranchIndentGuide as BranchIndentGuide,
}

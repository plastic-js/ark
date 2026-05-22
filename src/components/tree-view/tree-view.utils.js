import { TreeCollection } from '@zag-js/collection'

const flattenValues = (value)=> {
	if (Array.isArray(value)){
		return value.flatMap(flattenValues)
	}

	if (value == null || value === false || value === true){
		return []
	}

	return [value]
}

const isDescriptor = value=> value != null && typeof value === 'object' && 'tag' in value

const getDescriptorChildren = descriptor=> descriptor?.props?.children ?? descriptor?.children ?? null

export const isTreeViewPartDescriptor = (value, part)=> isDescriptor(value) && value.tag?.treeViewPart === part

const isNodeDescriptor = value=> isTreeViewPartDescriptor(value, 'item') || isTreeViewPartDescriptor(value, 'branch')

// For the old single-Item API: split children into sub-node items vs control content.
export const splitTreeViewItemChildren = (children)=> {
	const childValues = flattenValues(children)
	return {
		itemChildren: childValues.filter(child=> isNodeDescriptor(child)),
		controlChildren: childValues.filter(child=> !isNodeDescriptor(child)),
	}
}

const getTextValueChildren = (children)=> {
	const childValues = flattenValues(children)
	const itemTextChildren = childValues
		.filter(child=> isTreeViewPartDescriptor(child, 'item-text') || isTreeViewPartDescriptor(child, 'branch-text'))
		.map(getDescriptorChildren)

	return itemTextChildren.length > 0 ? itemTextChildren : children
}

const readTextContent = value=> flattenValues(value).map((child)=> {
	if (typeof child === 'string' || typeof child === 'number'){
		return String(child)
	}

	if (isDescriptor(child)){
		return readTextContent(getDescriptorChildren(child))
	}

	return ''
}).join('')
	.trim()

// For a Branch descriptor: find the nested nodes inside its BranchContent child.
const getBranchNodeChildren = (branchDescriptor)=> {
	const children = flattenValues(getDescriptorChildren(branchDescriptor))
	const branchContent = children.find(child=> isTreeViewPartDescriptor(child, 'branch-content'))
	return branchContent ? flattenValues(getDescriptorChildren(branchContent)).filter(isNodeDescriptor) : []
}

// Extract text from a Branch descriptor via its BranchControl > BranchText descendant.
const getTextFromBranchDescriptor = (branchDescriptor)=> {
	const children = flattenValues(getDescriptorChildren(branchDescriptor))
	const branchControl = children.find(child=> isTreeViewPartDescriptor(child, 'branch-control'))
	if (!branchControl){ return null }
	const controlChildren = flattenValues(getDescriptorChildren(branchControl))
	const branchText = controlChildren.find(child=> isTreeViewPartDescriptor(child, 'branch-text'))
	return branchText ? readTextContent(getDescriptorChildren(branchText)) : null
}

const createTreeNode = (descriptor, state, baseId)=> {
	const props = { ...descriptor.props ?? {} }
	const value = props['data-value'] ?? props.value ?? `${baseId}--node-${state.count++}`
	props['data-value'] = value
	const disabled = props.disabled === true || props['data-disabled'] === true || props['data-disabled'] === 'true'

	if (isTreeViewPartDescriptor(descriptor, 'branch')){
		const childNodes = getBranchNodeChildren(descriptor).map(child=> createTreeNode(child, state, baseId))
		const textValue = props['data-text-value'] ?? props.textValue ?? getTextFromBranchDescriptor(descriptor) ?? value
		return {
			value,
			textValue,
			disabled,
			children: childNodes.length > 0 ? childNodes : undefined,
		}
	}

	// leaf Item — also support old-style Item-as-branch for backwards compat
	const { itemChildren, controlChildren } = splitTreeViewItemChildren(getDescriptorChildren(descriptor))
	const childNodes = itemChildren.map(child=> createTreeNode(child, state, baseId))
	return {
		value,
		textValue: props['data-text-value'] ?? props.textValue ?? readTextContent(getTextValueChildren(controlChildren)) ?? value,
		disabled,
		children: childNodes.length > 0 ? childNodes : undefined,
	}
}

export const createTreeViewCollection = (children, baseId)=> {
	const rootChildren = flattenValues(children).filter(isNodeDescriptor)
	const state = { count: 0 }
	return new TreeCollection({
		rootNode: {
			value: `${baseId}--root`,
			textValue: 'root',
			children: rootChildren.map(child=> createTreeNode(child, state, baseId)),
		},
		nodeToValue: node=> node.value,
		nodeToString: node=> node.textValue ?? node.value,
		nodeToChildren: node=> node.children ?? [],
		nodeToChildrenCount: node=> node.children?.length ? node.children.length : undefined,
		isNodeDisabled: node=> Boolean(node.disabled),
	})
}

import * as treeView from '@zag-js/tree-view'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { treeViewAnatomy } from './tree-view.anatomy.js'
import { createTreeViewCollection } from './tree-view.utils.js'

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

export const useTreeView = (props = {})=> {
	const [machineProps, elementProps] = splitTreeViewProps(props)
	const anatomy = treeViewAnatomy.build()
	const id = machineProps.id ?? createUniqueId('tree-view')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const fallbackCollection = machineProps.collection == null ? createTreeViewCollection(machineProps.children, id) : null
	const getCollection = ()=> machineProps.collection ?? fallbackCollection
	const service = useMachine(treeView.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		collection: getCollection(),
		expandedValue: machineProps.expandedValue ?? machineProps.expanded,
		defaultExpandedValue: machineProps.defaultExpandedValue ?? machineProps.defaultExpanded,
		onExpandedChange: details=> machineProps.onExpandedChange?.(details.expandedValue),
	}))

	const getNodeProps = (value)=> {
		const collection = getCollection()
		const indexPath = collection.getIndexPath(value)
		if (!indexPath){
			return null
		}

		const node = collection.at(indexPath)
		if (!node){
			return null
		}

		return {
			node,
			indexPath,
		}
	}

	return createComputed(()=> {
		const api = treeView.connect(service, normalizeProps)
		return {
			...api,
			getCollection,
			getNodeProps,
			isBranchNode: (value)=> {
				const nodeProps = getNodeProps(value)
				return nodeProps ? getCollection().isBranchNode(nodeProps.node) : false
			},
			getRootProps: ()=> mergeProps(api.getTreeProps(), elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				'aria-activedescendant': api.focusedValue ? `tree:${id}:node:${api.focusedValue}` : undefined,
				...anatomy.root.attrs,
				children: machineProps.children,
			}),
		}
	})
}

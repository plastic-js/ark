import { ark } from '../factory.js'
import { mergeProps } from '../../utils/index.js'
import {
	useTreeViewContext,
	useTreeViewNodeContext,
} from './tree-view-context.js'

const focusBranchControl = (element)=> {
	if (!element){ return }
	if (!element.hasAttribute('tabindex')){
		element.tabIndex = -1
	}
	element.focus()
}

export const TreeViewBranchControl = (props = {})=> {
	const treeView = useTreeViewContext()
	const nodeContext = useTreeViewNodeContext()
	if (!treeView || !nodeContext){
		return ark.div(props)
	}

	return ark.div(mergeProps(()=> {
		const branchControlProps = treeView().getBranchControlProps(nodeContext().nodeProps)
		const {
			onClick: branchControlOnClick,
			role: _role,
			...rest
		} = branchControlProps
		return {
			...rest,
			'data-state': ()=> treeView().getBranchControlProps(nodeContext().nodeProps)['data-state'],
			'data-loading': ()=> treeView().getBranchControlProps(nodeContext().nodeProps)['data-loading'],
			onKeyDown: (event)=> {
				branchControlProps.onKeyDown?.(event)
				if (event.key !== 'ArrowRight' || event.currentTarget.getAttribute('data-state') !== 'open'){
					return
				}
				const branchContent = [...event.currentTarget.parentElement?.children ?? []].find(child=> child.dataset?.part === 'branch-content')
				const firstChild = branchContent?.querySelector?.('[data-part="item"], [data-part="branch-control"]')
				if (firstChild && !firstChild.hasAttribute('tabindex')){
					firstChild.tabIndex = -1
				}
				firstChild?.focus?.()
			},
			onClick: (event)=> {
				const clickedText = event.target instanceof Element && event.target.closest?.('[data-part="branch-text"]')
				if (event.target !== event.currentTarget && !clickedText){ return }
				branchControlOnClick?.(event)
				focusBranchControl(event.currentTarget)
			},
		}
	}, props))
}

TreeViewBranchControl.treeViewPart = 'branch-control'

// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { TreeView } from '../index.js'
import { useTreeView } from '../use-tree-view.js'
import {
	createSignal,
	h,
	renderApp,
} from '../../../runtime.js'
import { createTreeViewCollection } from '../tree-view.utils.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

// Helper: build a branch node with the new anatomy.
const branchNode = (value, label, children)=> h(TreeView.Branch, { 'data-value': value }, [
	h(TreeView.BranchControl, null, [
		h(TreeView.BranchTrigger, null, '>'),
		h(TreeView.BranchText, null, label),
	]),
	h(TreeView.BranchContent, null, children),
])

const leafNode = (value, label)=> h(TreeView.Item, { 'data-value': value }, h(TreeView.ItemText, null, label))

describe('@ark-ui/plastic TreeView', ()=> {
	it('renders nested tree items with tree semantics', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(TreeView.Root, {
			children: branchNode('parent', 'Parent', [
				leafNode('child', 'Child'),
			]),
		}))

		const root = container.querySelector('[data-part="root"]')
		const parent = container.querySelector('[data-part="branch"][data-value="parent"]')
		const child = container.querySelector('[data-value="child"]')

		expect(root.getAttribute('role')).toBe('tree')
		expect(parent.getAttribute('role')).toBe('treeitem')
		expect(child.getAttribute('role')).toBe('treeitem')
		expect(child.getAttribute('aria-level')).toBe('2')
	})

	it('supports controlled expansion and keyboard navigation', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const expanded = createSignal([])
		const onExpandedChange = vi.fn()

		renderApp(container, h(TreeView.Root, {
			expanded,
			onExpandedChange,
			children: branchNode('parent', 'Parent', [
				leafNode('child', 'Child'),
			]),
		}))

		const parent = container.querySelector('[data-part="branch"]')
		const parentControl = container.querySelector('[data-part="branch-control"]')
		const child = container.querySelector('[data-value="child"]')

		await user.click(parentControl)
		expect(document.activeElement).toBe(parentControl)
		expect(onExpandedChange).toHaveBeenCalledWith(['parent'])

		expanded(['parent'])
		expect(parent.getAttribute('aria-expanded')).toBe('true')

		await user.keyboard('[ArrowRight]')
		expect(document.activeElement).toBe(child)
	})

	it('toggles a branch when clicking its trigger button', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(TreeView.Root, {
			defaultExpanded: ['parent'],
			children: branchNode('parent', 'Parent', [
				leafNode('child', 'Child'),
			]),
		}))

		const parent = container.querySelector('[data-part="branch"]')
		const trigger = container.querySelector('[data-part="branch-trigger"]')
		const branchContent = container.querySelector('[data-part="branch-content"]')

		expect(parent.getAttribute('aria-expanded')).toBe('true')

		await user.click(trigger)
		expect(parent.getAttribute('data-state')).toBe('closed')
		expect(branchContent.hidden).toBe(true)

		await user.click(trigger)
		expect(parent.getAttribute('aria-expanded')).toBe('true')
		expect(branchContent.hidden).toBe(false)
	})

	it('toggles from closed to open and back when the trigger is clicked repeatedly', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(TreeView.Root, {
			children: branchNode('parent', 'Parent', [
				leafNode('child', 'Child'),
			]),
		}))

		const parent = container.querySelector('[data-part="branch"]')
		const trigger = container.querySelector('[data-part="branch-trigger"]')
		const branchContent = container.querySelector('[data-part="branch-content"]')

		expect(parent.getAttribute('data-state')).toBe('closed')
		expect(branchContent.hidden).toBe(true)

		await user.click(trigger)
		expect(parent.getAttribute('aria-expanded')).toBe('true')
		expect(branchContent.hidden).toBe(false)

		await user.click(trigger)
		expect(parent.getAttribute('data-state')).toBe('closed')
		expect(branchContent.hidden).toBe(true)
	})

	it('routes branch text clicks through the same toggle and focus path as the control', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(TreeView.Root, {
			children: branchNode('parent', 'Parent', [
				leafNode('child', 'Child'),
			]),
		}))

		const parent = container.querySelector('[data-part="branch"]')
		const parentControl = container.querySelector('[data-part="branch-control"]')
		const branchText = container.querySelector('[data-part="branch-text"]')
		const branchContent = container.querySelector('[data-part="branch-content"]')

		expect(parent.getAttribute('data-state')).toBe('closed')
		expect(branchContent.hidden).toBe(true)

		await user.click(branchText)
		expect(parent.getAttribute('aria-expanded')).toBe('true')
		expect(branchContent.hidden).toBe(false)
		expect(document.activeElement).toBe(parentControl)

		await user.click(branchText)
		expect(parent.getAttribute('data-state')).toBe('closed')
		expect(branchContent.hidden).toBe(true)
		expect(document.activeElement).toBe(parentControl)
	})

	it('focuses a nested branch control when its text is clicked', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(TreeView.Root, {
			children: branchNode('parent', 'Parent', [
				branchNode('nested', 'Nested', [
					leafNode('leaf', 'Leaf'),
				]),
			]),
		}))

		const parentTrigger = container.querySelector('[data-part="branch-trigger"][data-value="parent"]')
		const nestedControl = container.querySelector('[data-part="branch-control"][data-value="nested"]')
		const nestedText = nestedControl.querySelector('[data-part="branch-text"]')
		const nestedBranch = container.querySelector('[data-part="branch"][data-value="nested"]')

		await user.click(parentTrigger)
		await user.click(nestedText)

		expect(nestedBranch.getAttribute('data-state')).toBe('open')
		expect(document.activeElement).toBe(nestedControl)
	})

	it('derives textValue from BranchText content when building the collection', ()=> {
		const collection = createTreeViewCollection([
			h(TreeView.Branch, { value: 'parent' }, [
				h(TreeView.BranchControl, null, [
					h(TreeView.BranchTrigger, null, '>'),
					h(TreeView.BranchText, null, 'Parent'),
				]),
				h(TreeView.BranchContent, null, []),
			]),
		], 'tree')

		expect(collection.rootNode.children[0].textValue).toBe('Parent')
	})

	it('keeps the inferred collection stable across repeated api reads', ()=> {
		let treeViewApi
		const container = document.createElement('div')
		document.body.append(container)

		const CaptureTreeViewApi = ()=> {
			treeViewApi = useTreeView({
				children: h(TreeView.Branch, { value: 'parent' }, [
					h(TreeView.BranchControl, null, h(TreeView.BranchText, null, 'Parent')),
					h(TreeView.BranchContent, null, []),
				]),
			})

			return h('div')
		}

		renderApp(container, h(CaptureTreeViewApi))

		expect(treeViewApi().getCollection()).toBe(treeViewApi().getCollection())
	})

	it('composes a leaf item onClick without overriding the internal click path', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const onClick = vi.fn()

		renderApp(container, h(TreeView.Root, {
			children: leafNode('leaf', 'Leaf'),
		}))

		const leaf = container.querySelector('[data-value="leaf"]')
		// attach external click listener
		leaf.addEventListener('click', onClick)
		await user.click(leaf)

		expect(onClick).toHaveBeenCalledTimes(1)
		expect(document.activeElement).toBe(leaf)
	})

	describe('asChild', ()=> {
		it('renders only the child element — no div wrapper for TreeView.Item', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(TreeView.Root, {
				children: h(TreeView.Item, { 'data-value': 'readme', asChild: true }, h('a', { href: '/readme' }, 'README.md')),
			}))

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items.length).toBe(1)
			expect(items[0].tagName.toLowerCase()).toBe('a')
		})

		it('child receives data-part from the item part', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(TreeView.Root, {
				children: h(TreeView.Item, { 'data-value': 'readme', asChild: true }, h('a', { href: '/readme' }, 'README.md')),
			}))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('item')
		})

		it('merges event handlers — item selection and child onClick both fire', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const childSpy = vi.fn()

			renderApp(container, h(TreeView.Root, {
				children: h(TreeView.Item, { 'data-value': 'readme', asChild: true }, h('a', { href: '/readme', onClick: childSpy }, 'README.md')),
			}))

			const anchor = container.querySelector('a')
			await user.click(anchor)

			expect(childSpy).toHaveBeenCalledOnce()
			expect(document.activeElement).toBe(anchor)
		})
	})
})

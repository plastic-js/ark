// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Menu } from '../index.js'
import { h, renderApp } from '../../../runtime.js'

describe('@ark-ui/plastic Menu', ()=> {
	it('supports typeahead and calls onSelect for the matched item', ()=> {
		const container = document.createElement('div')
		const onSelect = vi.fn()

		renderApp(container, h(Menu.Root, {
			onSelect,
			children: [
				h(Menu.Trigger, null, 'Open'),
				h(Menu.Content, null, [
					h(Menu.Item, { value: 'archive' }, h(Menu.ItemText, null, 'Archive')),
					h(Menu.Item, { value: 'delete' }, h(Menu.ItemText, null, 'Delete')),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const items = container.querySelectorAll('[data-part="item"]')

		trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
		items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))
		items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

		expect(onSelect).toHaveBeenCalledWith('delete')
	})

	describe('asChild', ()=> {
		it('renders only the child element — no div wrapper for Menu.Item', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')

			renderApp(container, h(Menu.Root, null, [
				h(Menu.Trigger, null, 'Help'),
				h(Menu.Content, null, [
					h(Menu.Item, { value: 'docs', asChild: true }, h('a', { href: 'https://example.com' }, 'Documentation')),
				]),
			]))

			const trigger = container.querySelector('[data-part="trigger"]')
			trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items.length).toBe(1)
			expect(items[0].tagName.toLowerCase()).toBe('a')
		})

		it('child receives data-part from the item part', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')

			renderApp(container, h(Menu.Root, null, [
				h(Menu.Trigger, null, 'Help'),
				h(Menu.Content, null, [
					h(Menu.Item, { value: 'docs', asChild: true }, h('a', { href: 'https://example.com' }, 'Documentation')),
				]),
			]))

			const trigger = container.querySelector('[data-part="trigger"]')
			trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('item')
		})

		it('merges event handlers — child onClick fires on click and machine onSelect fires on Enter', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			const childSpy = vi.fn()
			const onSelect = vi.fn()

			renderApp(container, h(Menu.Root, { onSelect }, [
				h(Menu.Trigger, null, 'Help'),
				h(Menu.Content, null, [
					h(Menu.Item, { value: 'docs', asChild: true }, h('a', { href: '#', onClick: childSpy }, 'Documentation')),
				]),
			]))

			const trigger = container.querySelector('[data-part="trigger"]')
			trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

			const anchor = container.querySelector('a')

			// child onClick fires on click
			await user.click(anchor)
			expect(childSpy).toHaveBeenCalledOnce()

			// machine onSelect fires via keyboard Enter (delegated from asChild element)
			anchor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
			expect(onSelect).toHaveBeenCalledWith('docs')
		})
	})

	describe('reactivity regression guards', ()=> {
		it('updates Menu.Root data-state when the menu opens', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.appendChild(container)

			renderApp(container, h(Menu.Root, null, [
				h(Menu.Trigger, null, 'Open'),
				h(Menu.Positioner, null, [
					h(Menu.Content, null, [
						h(Menu.Item, { value: 'archive' }, h(Menu.ItemText, null, 'Archive')),
					]),
				]),
			]))

			const root = container.querySelector('[class]') ?? container.firstElementChild
			expect(root.getAttribute('data-state')).toBe('closed')

			await user.click(container.querySelector('[data-part="trigger"]'))

			expect(root.getAttribute('data-state')).toBe('open')
			document.body.removeChild(container)
		})

		it('renders Menu.Content when nested inside Menu.Positioner', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Menu.Root, { defaultOpen: true }, [
				h(Menu.Trigger, null, 'Open'),
				h(Menu.Positioner, null, [
					h(Menu.Content, null, [
						h(Menu.Item, { value: 'archive' }, h(Menu.ItemText, null, 'Archive')),
					]),
				]),
			]))

			const positioner = container.querySelector('[data-part="positioner"]')
			const content = positioner?.querySelector('[data-part="content"]')
			// Regression: previously a `()=> ... ark.div(...)` thunk inside the
			// positioner failed to materialize via PENDING_DESCRIPTORS, leaving
			// the positioner empty.
			expect(content).not.toBeNull()
			expect(content.querySelector('[data-part="item"]')).not.toBeNull()
		})

		it('keeps the same positioner element across item-hover signal updates', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.appendChild(container)

			renderApp(container, h(Menu.Root, { defaultOpen: true }, [
				h(Menu.Trigger, null, 'Open'),
				h(Menu.Positioner, null, [
					h(Menu.Content, null, [
						h(Menu.Item, { value: 'archive' }, h(Menu.ItemText, null, 'Archive')),
						h(Menu.Item, { value: 'duplicate' }, h(Menu.ItemText, null, 'Duplicate')),
					]),
				]),
			]))

			const positionerBefore = container.querySelector('[data-part="positioner"]')
			const items = container.querySelectorAll('[data-part="item"]')

			await user.hover(items[0])
			await user.hover(items[1])

			const positionerAfter = container.querySelector('[data-part="positioner"]')
			// Regression: a thunk wrapper around the positioner rebuilt the
			// element on every signal change (item highlight), breaking popper's
			// autoUpdate binding and making the menu jump.
			expect(positionerAfter).toBe(positionerBefore)
			document.body.removeChild(container)
		})
	})

	describe('disabled state', ()=> {
		it('supports disabled prop without errors', ()=> {
			const container = document.createElement('div')

			expect(()=> {
				renderApp(container, h(Menu.Root, {
					disabled: true,
					children: [
						h(Menu.Trigger, null, 'Open'),
						h(Menu.Content, null, [
							h(Menu.Item, { value: 'archive' }, h(Menu.ItemText, null, 'Archive')),
						]),
					],
				}))
			}).not.toThrow()
		})
	})
})

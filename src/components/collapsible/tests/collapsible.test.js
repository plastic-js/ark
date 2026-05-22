// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Collapsible } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> { document.body.innerHTML = '' })

const nextFrame = ()=> new Promise(resolve=> requestAnimationFrame(()=> requestAnimationFrame(resolve)))

describe('@ark-ui/plastic Collapsible', ()=> {
	it('toggles content from the trigger', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Collapsible.Root, {
			children: [
				h(Collapsible.Trigger, null, 'Toggle'),
				h(Collapsible.Content, null, 'Body'),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = ()=> container.querySelector('[data-part="content"]')

		expect(trigger.getAttribute('aria-expanded')).toBe('false')
		expect(content().hidden).toBe(true)

		await user.click(trigger)
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
		expect(content().hidden).toBe(false)
	})

	it('uncontrolled: defaultOpen sets initial open state; machine owns subsequent updates', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		renderApp(container, h(ComponentUnderTest, { defaultOpen: false }))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = ()=> container.querySelector('[data-part="content"]')

		expect(trigger.getAttribute('aria-expanded')).toBe('false')
		expect(content().hidden).toBe(true)

		await user.click(trigger)
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
		expect(content().hidden).toBe(false)
	})

	it('controlled: open signal drives visibility; click fires callback but signal owns state', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const open = createSignal(false)
		const spy = vi.fn()

		renderApp(container, h(Collapsible.Root, {
			open,
			onOpenChange: spy,
			children: [
				h(Collapsible.Trigger, null, 'Toggle'),
				h(Collapsible.Content, null, 'Body'),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = ()=> container.querySelector('[data-part="content"]')

		expect(content().hidden).toBe(true)

		await user.click(trigger)
		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
		expect(content().hidden).toBe(true)

		open(true)
		expect(content().hidden).toBe(false)
	})

	it('calls onOpenChange with true when opening', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onOpenChange: spy }))

		const trigger = container.querySelector('[data-part="trigger"]')
		await user.click(trigger)

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	it('calls onOpenChange with false when closing', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { defaultOpen: true, onOpenChange: spy }))

		const trigger = container.querySelector('[data-part="trigger"]')
		await user.click(trigger)

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(false)
	})

	describe('lazyMount and unmountOnExit', ()=> {
		it('default: content is in the DOM before first open', ()=> {
			const container = document.createElement('div')
			renderApp(container, h(Collapsible.Root, {
				children: [
					h(Collapsible.Trigger, null, 'Toggle'),
					h(Collapsible.Content, null, 'Body'),
				],
			}))
			expect(container.querySelector('[data-part="content"]')).not.toBeNull()
		})

		it('lazyMount: content is absent until first opened', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			renderApp(container, h(Collapsible.Root, {
				lazyMount: true,
				children: [
					h(Collapsible.Trigger, null, 'Toggle'),
					h(Collapsible.Content, null, 'Body'),
				],
			}))

			expect(container.querySelector('[data-part="content"]')).toBeNull()

			await user.click(container.querySelector('[data-part="trigger"]'))
			expect(container.querySelector('[data-part="content"]')).not.toBeNull()
		})

		it('lazyMount + unmountOnExit: content is removed from DOM after closing', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			renderApp(container, h(Collapsible.Root, {
				lazyMount: true,
				unmountOnExit: true,
				children: [
					h(Collapsible.Trigger, null, 'Toggle'),
					h(Collapsible.Content, null, 'Body'),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			expect(container.querySelector('[data-part="content"]')).toBeNull()

			await user.click(trigger)
			expect(container.querySelector('[data-part="content"]')).not.toBeNull()

			await user.click(trigger)
			await nextFrame()
			expect(container.querySelector('[data-part="content"]')).toBeNull()
		})
	})

	describe('asChild', ()=> {
		it('renders only the child element — no button wrapper', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Collapsible.Root, {
				children: [
					h(Collapsible.Trigger, { asChild: true }, h('a', { href: '#' }, 'Toggle')),
					h(Collapsible.Content, null, 'Body'),
				],
			}))

			expect(container.querySelector('button')).toBeNull()
			expect(container.querySelector('a')).not.toBeNull()
		})

		it('child receives data-part and aria-expanded from the part', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Collapsible.Root, {
				children: [
					h(Collapsible.Trigger, { asChild: true }, h('a', { href: '#' }, 'Toggle')),
					h(Collapsible.Content, null, 'Body'),
				],
			}))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('trigger')
			expect(anchor.getAttribute('aria-expanded')).toBe('false')
		})

		it('merges event handlers — both part toggle and child onClick fire', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			const childSpy = vi.fn()

			renderApp(container, h(Collapsible.Root, {
				children: [
					h(Collapsible.Trigger, { asChild: true }, h('a', { href: '#', onClick: childSpy }, 'Toggle')),
					h(Collapsible.Content, null, 'Body'),
				],
			}))

			const anchor = container.querySelector('a')
			await user.click(anchor)

			expect(childSpy).toHaveBeenCalledOnce()
			const content = container.querySelector('[data-part="content"]')
			expect(content.hidden).toBe(false)
		})
	})
})

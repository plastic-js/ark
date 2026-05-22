// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Popover } from '../index.js'
import { h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Popover', ()=> {
	it('opens from the trigger and dismisses on outside pointerdown', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Popover.Root, {
			children: [
				h(Popover.Trigger, null, 'Open'),
				h(Popover.Content, null, [
					h('span', null, 'Panel'),
					h(Popover.CloseTrigger, null, 'Close'),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = ()=> document.body.querySelector('[data-part="content"]')
		expect(content().hidden).toBe(true)

		await user.click(trigger)
		expect(content().hidden).toBe(false)

		document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }))
		expect(content().hidden).toBe(true)
	})

	it('dismisses when the close trigger is clicked', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Popover.Root, {
			children: [
				h(Popover.Trigger, null, 'Open'),
				h(Popover.Content, null, [
					h('span', null, 'Panel'),
					h(Popover.CloseTrigger, null, 'Close'),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = ()=> document.body.querySelector('[data-part="content"]')
		const close = ()=> document.body.querySelector('[data-part="close-trigger"]')

		await user.click(trigger)
		expect(content().hidden).toBe(false)

		await user.click(close())
		expect(content().hidden).toBe(true)
	})

	it('calls onOpenChange with true when trigger is clicked', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onOpenChange: spy }))

		await user.click(container.querySelector('[data-part="trigger"]'))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	describe('asChild', ()=> {
		it('renders only the child element — no button wrapper', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Popover.Root, null, [
				h(Popover.Trigger, { asChild: true }, h('a', { href: '#' }, 'Open')),
				h(Popover.Content, null, 'Panel'),
			]))

			expect(container.querySelector('button')).toBeNull()
			expect(container.querySelector('a')).not.toBeNull()
		})

		it('child receives data-part from the trigger part', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Popover.Root, null, [
				h(Popover.Trigger, { asChild: true }, h('a', { href: '#' }, 'Open')),
				h(Popover.Content, null, 'Panel'),
			]))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('trigger')
		})

		it('merges event handlers — popover opens and child onClick fires', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const childSpy = vi.fn()

			renderApp(container, h(Popover.Root, null, [
				h(Popover.Trigger, { asChild: true }, h('a', { href: '#', onClick: childSpy }, 'Open')),
				h(Popover.Content, null, 'Panel'),
			]))

			const anchor = container.querySelector('a')
			await user.click(anchor)

			expect(childSpy).toHaveBeenCalledOnce()
			expect(anchor.getAttribute('aria-expanded')).toBe('true')
		})
	})

	describe('disabled state', ()=> {
		it('supports disabled prop without errors', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			expect(()=> {
				renderApp(container, h(Popover.Root, {
					disabled: true,
					children: [
						h(Popover.Trigger, null, 'Open'),
						h(Popover.Content, null, 'Panel content'),
					],
				}))
			}).not.toThrow()
		})
	})
})

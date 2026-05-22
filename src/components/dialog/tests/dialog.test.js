// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dialog } from '../index.js'
import { h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

const disposers = []

afterEach(()=> {
	disposers.splice(0).forEach(dispose=> dispose())
	document.body.innerHTML = ''
})

const flushOverlay = ()=> new Promise((resolve)=> {
	requestAnimationFrame(()=> {
		requestAnimationFrame(resolve)
	})
})

describe('@ark-ui/plastic Dialog', ()=> {
	it('opens, traps focus, and returns focus when closed', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		disposers.push(renderApp(container, h(Dialog.Root, {
			children: [
				h(Dialog.Trigger, null, 'Open dialog'),
				h(Dialog.Backdrop),
				h(Dialog.Positioner, null, h(Dialog.Content, null, [
					h(Dialog.Title, null, 'Dialog title'),
					h(Dialog.Description, null, 'Dialog body'),
					h('button', { id: 'inside-dialog' }, 'Action'),
					h(Dialog.CloseTrigger, null, 'Close'),
				])),
			],
		})))

		const trigger = container.querySelector('[data-part="trigger"]')
		await user.click(trigger)
		await flushOverlay()
		expect(document.activeElement.id).toBe('inside-dialog')

		await user.click(document.body.querySelector('[data-part="close-trigger"]'))
		await flushOverlay()
		expect(document.activeElement).toBe(trigger)
	})

	it('calls onOpenChange with true when opened', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		disposers.push(renderApp(container, h(ComponentUnderTest, { onOpenChange: spy })))

		await user.click(container.querySelector('[data-part="trigger"]'))
		await flushOverlay()

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	describe('lazyMount and unmountOnExit', ()=> {
		const click = el=> el.dispatchEvent(new MouseEvent('click', { bubbles: true }))

		const renderDialog = (props = {})=> {
			const container = document.createElement('div')
			document.body.append(container)
			disposers.push(renderApp(container, h(Dialog.Root, {
				...props,
				children: [
					h(Dialog.Trigger, null, 'Open'),
					h(Dialog.Positioner, null, h(Dialog.Content, null, [
						h(Dialog.CloseTrigger, null, 'Close'),
					])),
				],
			})))
			return container
		}

		it('default: positioner is in the DOM before first open', ()=> {
			renderDialog()
			expect(document.body.querySelector('[data-part="positioner"]')).not.toBeNull()
		})

		it('lazyMount: positioner is absent until first opened', async()=> {
			const container = renderDialog({ lazyMount: true })

			expect(document.body.querySelector('[data-part="positioner"]')).toBeNull()

			click(container.querySelector('[data-part="trigger"]'))
			await flushOverlay()
			expect(document.body.querySelector('[data-part="positioner"]')).not.toBeNull()
		})

		it('lazyMount + unmountOnExit: positioner is removed from DOM after closing', async()=> {
			const container = renderDialog({ lazyMount: true, unmountOnExit: true })

			expect(document.body.querySelector('[data-part="positioner"]')).toBeNull()

			click(container.querySelector('[data-part="trigger"]'))
			await flushOverlay()
			expect(document.body.querySelector('[data-part="positioner"]')).not.toBeNull()

			click(document.body.querySelector('[data-part="close-trigger"]'))
			await flushOverlay()
			expect(document.body.querySelector('[data-part="positioner"]')).toBeNull()
		})
	})

	describe('disabled state', ()=> {
		it('supports disabled prop without errors', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			expect(()=> {
				disposers.push(renderApp(container, h(Dialog.Root, {
					disabled: true,
					children: [
						h(Dialog.Trigger, null, 'Open dialog'),
						h(Dialog.Positioner, null, h(Dialog.Content, null, 'Content')),
					],
				})))
			}).not.toThrow()
		})
	})
})

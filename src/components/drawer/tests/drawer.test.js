// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Drawer } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	document.body.innerHTML = ''
})

const flushOverlay = ()=> new Promise((resolve)=> {
	requestAnimationFrame(()=> {
		requestAnimationFrame(resolve)
	})
})

describe('@ark-ui/plastic Drawer', ()=> {
	it('opens and closes on escape', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Drawer.Root, {
			children: [
				h(Drawer.Trigger, null, 'Open drawer'),
				h(Drawer.Backdrop),
				h(Drawer.Positioner, null, h(Drawer.Content, null, [
					h(Drawer.Title, null, 'Drawer title'),
					h(Drawer.Description, null, 'Drawer body'),
					h(Drawer.CloseTrigger, null, 'Close'),
				])),
			],
		}))

		await user.click(container.querySelector('[data-part="trigger"]'))
		await flushOverlay()
		const content = document.body.querySelector('[data-part="content"]')
		expect(content.hidden).toBe(false)

		await user.keyboard('[Escape]')
		await flushOverlay()
		expect(content.hidden).toBe(true)
	})

	it('reopens after closing a controlled drawer from the close trigger', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const open = createSignal(false)

		renderApp(container, h(Drawer.Root, {
			open,
			onOpenChange: open,
			children: [
				h(Drawer.Trigger, null, 'Open drawer'),
				h(Drawer.Backdrop),
				h(Drawer.Positioner, null, h(Drawer.Content, null, [
					h(Drawer.Title, null, 'Drawer title'),
					h(Drawer.Description, null, 'Drawer body'),
					h(Drawer.CloseTrigger, null, 'Close'),
				])),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		await user.click(trigger)
		await flushOverlay()

		const content = document.body.querySelector('[data-part="content"]')
		expect(content.hidden).toBe(false)

		await user.click(document.body.querySelector('[data-part="close-trigger"]'))
		await flushOverlay()
		expect(content.hidden).toBe(true)

		await user.click(trigger)
		await flushOverlay()
		expect(content.hidden).toBe(false)
	})

	it('calls onOpenChange with true when trigger is clicked', async()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onOpenChange: spy }))

		container.querySelector('[data-part="trigger"]').click()
		await flushOverlay()

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	describe('disabled state', ()=> {
		it('supports disabled prop without errors', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			expect(()=> {
				renderApp(container, h(Drawer.Root, {
					disabled: true,
					children: [
						h(Drawer.Trigger, null, 'Open drawer'),
						h(Drawer.Positioner, null, h(Drawer.Content, null, 'Content')),
					],
				}))
			}).not.toThrow()
		})
	})
})

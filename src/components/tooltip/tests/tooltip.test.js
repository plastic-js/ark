// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { Tooltip } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	vi.useRealTimers()
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Tooltip', ()=> {
	it('opens on hover and closes on leave', ()=> {
		vi.useFakeTimers()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Tooltip.Root, {
			openDelay: 0,
			closeDelay: 0,
			children: [
				h(Tooltip.Trigger, null, 'Hover'),
				h(Tooltip.Content, null, 'Helpful text'),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = ()=> document.body.querySelector('[data-part="content"]')

		trigger.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }))
		vi.runAllTimers()
		expect(content().hidden).toBe(false)

		trigger.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, pointerType: 'mouse' }))
		vi.runAllTimers()
		expect(content().hidden).toBe(true)
	})

	it('uncontrolled: defaultOpen sets initial state; machine owns subsequent updates', ()=> {
		vi.useFakeTimers()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Tooltip.Root, {
			defaultOpen: true,
			openDelay: 0,
			closeDelay: 0,
			children: [
				h(Tooltip.Trigger, null, 'Hover'),
				h(Tooltip.Content, null, 'Helpful text'),
			],
		}))

		vi.runAllTimers()
		const content = ()=> document.body.querySelector('[data-part="content"]')
		expect(content().hidden).toBe(false)

		const trigger = container.querySelector('[data-part="trigger"]')
		trigger.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, pointerType: 'mouse' }))
		vi.runAllTimers()
		expect(content().hidden).toBe(true)
	})

	it('controlled: open signal drives visibility; onOpenChange keeps signal in sync', async()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const open = createSignal(false)

		renderApp(container, h(Tooltip.Root, {
			open,
			onOpenChange: open,
			openDelay: 0,
			closeDelay: 0,
			children: [
				h(Tooltip.Trigger, null, 'Hover'),
				h(Tooltip.Content, null, 'Helpful text'),
			],
		}))

		const content = ()=> document.body.querySelector('[data-part="content"]')

		expect(content().hidden).toBe(true)

		open(true)
		await Promise.resolve()
		expect(content().hidden).toBe(false)

		open(false)
		await Promise.resolve()
		expect(content().hidden).toBe(true)
	})

	it('calls onOpenChange with true when hovered', ()=> {
		vi.useFakeTimers()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onOpenChange: spy }))

		const trigger = container.querySelector('[data-part="trigger"]')
		trigger.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }))
		vi.runAllTimers()

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	describe('lazyMount and unmountOnExit', ()=> {
		const hover = el=> el.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }))
		const unhover = el=> el.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, pointerType: 'mouse' }))

		const renderTooltip = (props = {})=> {
			const container = document.createElement('div')
			document.body.append(container)
			renderApp(container, h(Tooltip.Root, {
				openDelay: 0,
				closeDelay: 0,
				...props,
				children: [
					h(Tooltip.Trigger, null, 'Hover'),
					h(Tooltip.Positioner, null, h(Tooltip.Content, null, 'Tip')),
				],
			}))
			return container
		}

		it('default: positioner is in the DOM before first hover', ()=> {
			vi.useFakeTimers()
			renderTooltip()
			expect(document.body.querySelector('[data-part="positioner"]')).not.toBeNull()
			vi.useRealTimers()
		})

		it('lazyMount: positioner is absent until first hovered', ()=> {
			vi.useFakeTimers()
			const container = renderTooltip({ lazyMount: true })

			expect(document.body.querySelector('[data-part="positioner"]')).toBeNull()

			hover(container.querySelector('[data-part="trigger"]'))
			vi.runAllTimers()
			expect(document.body.querySelector('[data-part="positioner"]')).not.toBeNull()
			vi.useRealTimers()
		})

		it('lazyMount + unmountOnExit: positioner is removed from DOM after leaving', ()=> {
			vi.useFakeTimers()
			const container = renderTooltip({ lazyMount: true, unmountOnExit: true })
			const trigger = container.querySelector('[data-part="trigger"]')

			expect(document.body.querySelector('[data-part="positioner"]')).toBeNull()

			hover(trigger)
			vi.runAllTimers()
			expect(document.body.querySelector('[data-part="positioner"]')).not.toBeNull()

			unhover(trigger)
			vi.runAllTimers()
			expect(document.body.querySelector('[data-part="positioner"]')).toBeNull()
			vi.useRealTimers()
		})
	})
})

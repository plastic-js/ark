// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { HoverCard } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

const hoverOpen = (element)=> {
	element.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
	vi.runAllTimers()
}

afterEach(()=> {
	vi.useRealTimers()
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic HoverCard', ()=> {
	it('opens while hovering the trigger', ()=> {
		vi.useFakeTimers()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(HoverCard.Root, {
			openDelay: 0,
			closeDelay: 0,
			children: [
				h(HoverCard.Trigger, null, 'Profile'),
				h(HoverCard.Content, null, 'Details'),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = ()=> document.body.querySelector('[data-part="content"]')

		trigger.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
		vi.runAllTimers()
		expect(content().hidden).toBe(false)
	})

	it('uncontrolled: defaultOpen sets initial state; machine owns subsequent updates', ()=> {
		vi.useFakeTimers()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(HoverCard.Root, {
			defaultOpen: true,
			openDelay: 0,
			closeDelay: 0,
			children: [
				h(HoverCard.Trigger, null, 'Profile'),
				h(HoverCard.Content, null, 'Details'),
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

		renderApp(container, h(HoverCard.Root, {
			open,
			onOpenChange: open,
			openDelay: 0,
			closeDelay: 0,
			children: [
				h(HoverCard.Trigger, null, 'Profile'),
				h(HoverCard.Content, null, 'Details'),
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
		trigger.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
		vi.runAllTimers()

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	describe('asChild', ()=> {
		it('renders only the child element — no button wrapper', ()=> {
			vi.useFakeTimers()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(HoverCard.Root, { openDelay: 0, closeDelay: 0 }, [
				h(HoverCard.Trigger, { asChild: true }, h('a', { href: '#' }, 'Profile')),
				h(HoverCard.Content, null, 'Details'),
			]))

			expect(container.querySelector('button')).toBeNull()
			expect(container.querySelector('a')).not.toBeNull()
		})

		it('child receives data-part from the trigger part', ()=> {
			vi.useFakeTimers()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(HoverCard.Root, { openDelay: 0, closeDelay: 0 }, [
				h(HoverCard.Trigger, { asChild: true }, h('a', { href: '#' }, 'Profile')),
				h(HoverCard.Content, null, 'Details'),
			]))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('trigger')
		})

		it('merges event handlers — hover opens card and child onPointerEnter fires', ()=> {
			vi.useFakeTimers()
			const container = document.createElement('div')
			document.body.append(container)
			const childSpy = vi.fn()

			renderApp(container, h(HoverCard.Root, { openDelay: 0, closeDelay: 0 }, [
				h(HoverCard.Trigger, { asChild: true }, h('a', { href: '#', onPointerEnter: childSpy }, 'Profile')),
				h(HoverCard.Content, null, 'Details'),
			]))

			const anchor = container.querySelector('a')
			hoverOpen(anchor)

			expect(childSpy).toHaveBeenCalledOnce()
			const content = container.querySelector('[data-part="content"]')
			expect(content.hidden).toBe(false)
		})
	})
})

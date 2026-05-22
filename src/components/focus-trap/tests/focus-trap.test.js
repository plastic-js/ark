// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import { FocusTrap } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic FocusTrap', ()=> {
	it('moves focus inside the trap on mount', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(FocusTrap, {
			children: [
				h('button', { id: 'first' }, 'First'),
				h('button', { id: 'second' }, 'Second'),
			],
		}))

		expect(document.activeElement.id).toBe('first')
	})

	it('moves focus inside the trap when mounted from a reactive function child', ()=> {
		const container = document.createElement('div')
		const open = createSignal(false)
		document.body.append(container)

		renderApp(container, h('div', null, ()=> open()
? h('section', null, h(FocusTrap, {
			children: [
				h('button', { id: 'first-reactive' }, 'First'),
				h('button', { id: 'second-reactive' }, 'Second'),
			],
		}))
: null))

		open(true)

		expect(document.activeElement.id).toBe('first-reactive')
	})

	it('cycles focus when tabbing past the last focusable element', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(FocusTrap, {
			children: [
				h('button', { id: 'first' }, 'First'),
				h('button', { id: 'second' }, 'Second'),
			],
		}))

		document.querySelector('#second').focus()
		document.querySelector('#second').dispatchEvent(new KeyboardEvent('keydown', {
			key: 'Tab',
			bubbles: true,
		}))

		expect(document.activeElement.id).toBe('first')
	})

	it('returns focus when the trap unmounts', ()=> {
		const present = { current: null }
		const container = document.createElement('div')
		const before = document.createElement('button')
		before.id = 'before'
		document.body.append(before, container)
		before.focus()

		const dispose = renderApp(container, h(FocusTrap, {
			rootRef: (node)=> {
				present.current = node
			},
			children: h('button', { id: 'inside' }, 'Inside'),
		}))

		expect(document.activeElement.id).toBe('inside')
		dispose()
		expect(document.activeElement.id).toBe('before')
		expect(present.current).toBe(null)
	})

	it('calls onActivate with the root node on mount', ()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(FocusTrap, {
			onActivate: spy,
			children: h('button', { id: 'inside' }, 'Inside'),
		}))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(container.querySelector('[data-part="root"]'))
	})

	it('calls onDeactivate with the root node on unmount', ()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		const dispose = renderApp(container, h(FocusTrap, {
			onDeactivate: spy,
			children: h('button', { id: 'inside' }, 'Inside'),
		}))

		expect(spy).not.toHaveBeenCalled()
		dispose()
		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBeInstanceOf(HTMLElement)
	})
})

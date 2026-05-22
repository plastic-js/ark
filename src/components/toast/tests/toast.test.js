// @vitest-environment jsdom

import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Toast, createToaster } from '../index.js'
import {
	h,
	renderApp,
} from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
	vi.useRealTimers()
})

describe('@ark-ui/plastic Toast', ()=> {
	it('createToaster exposes create and dismiss', ()=> {
		const toaster = createToaster({ placement: 'bottom-end' })
		expect(typeof toaster.create).toBe('function')
		expect(typeof toaster.dismiss).toBe('function')
	})

	it('Toaster renders toasts imperatively and dismisses them', async()=> {
		vi.useFakeTimers()
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) })

		const container = document.createElement('div')
		document.body.append(container)

		const toaster = createToaster({ placement: 'bottom-end' })

		const App = ()=> h('div', null, h('button', {
			type: 'button',
			onClick: ()=> toaster.create({
				title: 'Saved', description: 'Changes stored', type: 'info',
			}),
		}, 'Show toast'), h(Toast.Toaster, { toaster }, toastItem=> h(Toast.Root, null, h(Toast.Title, null, toastItem.title), h(Toast.Description, null, toastItem.description), h(Toast.CloseTrigger, null, 'Dismiss'))))

		renderApp(container, h(App))

		const trigger = [...document.querySelectorAll('button')].find(b=> b.textContent === 'Show toast')
		expect(trigger).toBeTruthy()
		expect(document.querySelector('[data-part="root"]')).toBeNull()

		await user.click(trigger)

		const root = document.querySelector('[data-part="root"]')
		expect(root).toBeTruthy()
		expect(document.body.textContent).toContain('Saved')
		expect(document.body.textContent).toContain('Changes stored')

		const closeTrigger = document.querySelector('[data-part="close-trigger"]')
		expect(closeTrigger).toBeTruthy()
		await user.click(closeTrigger)

		// wait for removeDelay (200ms default) to expire
		vi.advanceTimersByTime(300)
		await vi.runAllTimersAsync()

		expect(document.querySelector('[data-part="root"]')).toBeNull()
	})

	it('keeps the same toast root while hovering', async()=> {
		vi.useFakeTimers()
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) })

		const container = document.createElement('div')
		document.body.append(container)

		const toaster = createToaster({ placement: 'bottom-end' })

		const App = ()=> h('div', null, h('button', {
			type: 'button',
			onClick: ()=> toaster.create({
				title: 'Saved', description: 'Changes stored', type: 'info', duration: 1000,
			}),
		}, 'Show toast'), h(Toast.Toaster, { toaster }, toastItem=> h(Toast.Root, null, h(Toast.Title, null, toastItem.title), h(Toast.Description, null, toastItem.description), h(Toast.CloseTrigger, null, 'Dismiss'))))

		renderApp(container, h(App))

		const trigger = [...document.querySelectorAll('button')].find(b=> b.textContent === 'Show toast')
		expect(trigger).toBeTruthy()

		await user.click(trigger)

		const root = document.querySelector('[data-part="root"]')
		expect(root).toBeTruthy()

		root.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

		// Advance time past the duration
		vi.advanceTimersByTime(2000)
		await vi.runAllTimersAsync()

		const hoveredRoot = document.querySelector('[data-part="root"]')
		expect(hoveredRoot).not.toBeNull()
	})

	it('Toaster supports multiple placements', ()=> {
		const top = createToaster({ placement: 'top' })
		const bottomEnd = createToaster({ placement: 'bottom-end' })
		expect(top).not.toBe(bottomEnd)
		top.create({ title: 'Top', type: 'info' })
		bottomEnd.create({ title: 'Bottom', type: 'success' })
		expect(top.getVisibleToasts().length).toBe(1)
		expect(bottomEnd.getVisibleToasts().length).toBe(1)
	})
})

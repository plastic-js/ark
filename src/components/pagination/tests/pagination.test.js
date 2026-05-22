// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Pagination } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

describe('@ark-ui/plastic Pagination', ()=> {
	it('changes the current page from triggers and items', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Pagination.Root, {
			defaultPage: 2,
			children: [
				h(Pagination.PrevTrigger, null, 'Prev'),
				h(Pagination.Item, { 'data-page': 1 }, '1'),
				h(Pagination.Item, { 'data-page': 2 }, '2'),
				h(Pagination.Item, { 'data-page': 3 }, '3'),
				h(Pagination.NextTrigger, null, 'Next'),
			],
		}))

		const prev = container.querySelector('[data-part="prev-trigger"]')
		const next = container.querySelector('[data-part="next-trigger"]')
		const items = container.querySelectorAll('[data-part="item"]')

		expect(items[1].getAttribute('aria-current')).toBe('page')
		await user.click(next)
		expect(items[2].getAttribute('aria-current')).toBe('page')
		await user.click(prev)
		expect(items[1].getAttribute('aria-current')).toBe('page')
	})

	it('maps controlled page changes to the legacy callback shape', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const page = createSignal(2)

		renderApp(container, h(Pagination.Root, {
			page,
			onPageChange: page,
			children: [
				h(Pagination.PrevTrigger, null, 'Prev'),
				h(Pagination.Item, { 'data-page': 1 }, '1'),
				h(Pagination.Item, { 'data-page': 2 }, '2'),
				h(Pagination.Item, { 'data-page': 3 }, '3'),
				h(Pagination.NextTrigger, null, 'Next'),
			],
		}))

		await user.click(container.querySelector('[data-part="next-trigger"]'))
		expect(page()).toBe(3)
		expect(container.querySelectorAll('[data-part="item"]')[2].getAttribute('aria-current')).toBe('page')
		expect(container.querySelector('[data-part="next-trigger"]').disabled).toBe(true)
	})

	it('calls onPageChange with the new page number', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onPageChange: spy }))

		await user.click(container.querySelector('[data-part="next-trigger"]'))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(3)
	})
})

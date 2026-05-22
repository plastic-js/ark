// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { RatingGroup } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

describe('@ark-ui/plastic RatingGroup', ()=> {
	it('reflects machine state through items and hidden input', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(RatingGroup.Root, {
			defaultValue: 2,
			count: 3,
			name: 'rating',
			children: [
				h(RatingGroup.Label, null, 'Rating'),
				h(RatingGroup.Control, null, [
					h(RatingGroup.Item, { value: 1 }, h(RatingGroup.ItemText, null, '1')),
					h(RatingGroup.Item, { value: 2 }, h(RatingGroup.ItemText, null, '2')),
					h(RatingGroup.Item, { value: 3 }, h(RatingGroup.ItemText, null, '3')),
					h(RatingGroup.HiddenInput),
				]),
			],
		}))

		const items = container.querySelectorAll('[data-part="item"]')
		const input = container.querySelector('[data-part="hidden-input"]')

		expect(items[1].getAttribute('aria-checked')).toBe('true')
		expect(input.value).toBe('2')

		await user.click(items[0])
		expect(input.value).toBe('1')
		expect(items[0].getAttribute('aria-checked')).toBe('true')
	})

	it('maps controlled value changes to the legacy callback shape', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const value = createSignal(2)

		renderApp(container, h(RatingGroup.Root, {
			count: 3,
			value,
			onValueChange: value,
			children: [
				h(RatingGroup.Control, null, [
					h(RatingGroup.Item, { value: 1 }, h(RatingGroup.ItemText, null, '1')),
					h(RatingGroup.Item, { value: 2 }, h(RatingGroup.ItemText, null, '2')),
					h(RatingGroup.Item, { value: 3 }, h(RatingGroup.ItemText, null, '3')),
				]),
				h(RatingGroup.HiddenInput),
			],
		}))

		await user.click(container.querySelectorAll('[data-part="item"]')[0])
		expect(value()).toBe(1)
		expect(container.querySelector('[data-part="hidden-input"]').value).toBe('1')
	})

	it('calls onValueChange with the selected rating number', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		await user.click(container.querySelectorAll('[data-part="item"]')[0])

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(1)
	})
})

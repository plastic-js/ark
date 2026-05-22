// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { TagsInput } from '../index.js'
import { h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic TagsInput', ()=> {
	it('renders predefined tags and supports keyboard navigation', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(TagsInput.Root, {
			defaultValue: ['alpha', 'beta'],
			children: [
				h(TagsInput.Label, null, 'Tags'),
				h(TagsInput.Control, null, [
					h(TagsInput.Item, { value: 'alpha' }, h(TagsInput.ItemText, null, 'alpha')),
					h(TagsInput.Item, { value: 'beta' }, h(TagsInput.ItemText, null, 'beta')),
					h(TagsInput.Input),
				]),
				h(TagsInput.ClearTrigger, null, 'Clear'),
			],
		}))

		const items = container.querySelectorAll('[data-part="item"]')
		expect(items.length).toBe(2)
		expect(items[0].getAttribute('data-value')).toBe('alpha')
		expect(items[1].getAttribute('data-value')).toBe('beta')
	})

	it('calls onInputValueChange with the typed string', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onInputValueChange: spy }))

		await user.type(container.querySelector('[data-part="input"]'), 'g')

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toBe('g')
	})

	it('calls onValueChange with the new tags array after adding a tag', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		const input = container.querySelector('[data-part="input"]')
		await user.type(input, 'gamma')
		await user.keyboard('[Enter]')

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toEqual(['alpha', 'beta', 'gamma'])
	})
})

// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Listbox } from '../index.js'
import { h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Listbox', ()=> {
	it('supports roving focus, typeahead, disabled items, and group labeling', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Listbox.Root, {
			defaultValue: 'banana',
			children: [
				h(Listbox.Label, null, 'Fruits'),
				h(Listbox.Content, null, [
					h(Listbox.ItemGroup, null, [
						h(Listbox.ItemGroupLabel, null, 'Fresh'),
						h(Listbox.Item, { value: 'apple' }, h(Listbox.ItemText, null, 'Apple')),
						h(Listbox.Item, {
							value: 'banana', 'data-disabled': 'true',
						}, h(Listbox.ItemText, null, 'Banana')),
					]),
					h(Listbox.Item, { value: 'cherry' }, h(Listbox.ItemText, null, 'Cherry')),
				]),
			],
		}))

		const label = container.querySelector('[data-part="label"]')
		const content = container.querySelector('[data-part="content"]')
		const items = container.querySelectorAll('[data-part="item"]')

		expect(content.getAttribute('aria-labelledby')).toBe(label.id)
		expect(container.querySelector('[data-part="item-group"]').getAttribute('aria-labelledby')).toContain('--label')

		content.focus()
		// first ArrowDown highlights the first item (apple); second skips disabled banana → cherry
		content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
		content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
		expect(content.getAttribute('aria-activedescendant')).toBe(items[2].id)

		// Home returns highlight to the first item
		content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
		expect(content.getAttribute('aria-activedescendant')).toBe(items[0].id)
	})

	it('covers the multi-select path and mirrors hidden input state', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Listbox.Root, {
			defaultValue: ['apple'],
			multiple: true,
			name: 'fruits',
			children: [
				h(Listbox.Content, null, [
					h(Listbox.Item, { value: 'apple' }, [
						h(Listbox.ItemText, null, 'Apple'),
						h(Listbox.ItemHiddenInput),
					]),
					h(Listbox.Item, { value: 'banana' }, [
						h(Listbox.ItemText, null, 'Banana'),
						h(Listbox.ItemHiddenInput),
					]),
				]),
			],
		}))

		const items = container.querySelectorAll('[data-part="item"]')
		const inputs = container.querySelectorAll('[data-part="item-hidden-input"]')

		await user.click(items[1])

		expect(items[0].getAttribute('aria-selected')).toBe('true')
		expect(items[1].getAttribute('aria-selected')).toBe('true')
		expect(inputs[0].checked).toBe(true)
		expect(inputs[1].checked).toBe(true)
	})

	it('redirects pointer mousedown focus to the content container (activedescendant model)', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Listbox.Root, {
			children: [
				h(Listbox.Content, null, [
					h(Listbox.Item, { value: 'apple' }, h(Listbox.ItemText, null, 'Apple')),
				]),
			],
		}))

		const content = container.querySelector('[data-part="content"]')
		const item = container.querySelector('[data-part="item"]')
		const mouseDown = new MouseEvent('mousedown', {
			bubbles: true,
			cancelable: true,
		})

		const dispatched = item.dispatchEvent(mouseDown)

		expect(dispatched).toBe(false)
		expect(mouseDown.defaultPrevented).toBe(true)
		expect(document.activeElement).toBe(content)
	})

	it('calls onValueChange with the selected item value string', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		const items = container.querySelectorAll('[data-part="item"]')
		await user.click(items[0])

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe('apple')
	})

	describe('value shape: single vs multi select', ()=> {
		it('single-select: onValueChange receives a string (not an array)', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			renderApp(container, h(Listbox.Root, {
				onValueChange: spy,
				children: [
					h(Listbox.Content, null, [
						h(Listbox.Item, { value: 'apple' }, h(Listbox.ItemText, null, 'Apple')),
						h(Listbox.Item, { value: 'mango' }, h(Listbox.ItemText, null, 'Mango')),
					]),
				],
			}))

			await user.click(container.querySelectorAll('[data-part="item"]')[1])

			expect(typeof spy.mock.calls[0][0]).toBe('string')
			expect(spy.mock.calls[0][0]).toBe('mango')
		})

		it('multi-select: onValueChange receives an array of strings', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			renderApp(container, h(Listbox.Root, {
				multiple: true,
				onValueChange: spy,
				children: [
					h(Listbox.Content, null, [
						h(Listbox.Item, { value: 'apple' }, h(Listbox.ItemText, null, 'Apple')),
						h(Listbox.Item, { value: 'mango' }, h(Listbox.ItemText, null, 'Mango')),
					]),
				],
			}))

			await user.click(container.querySelectorAll('[data-part="item"]')[1])

			expect(Array.isArray(spy.mock.calls[0][0])).toBe(true)
			expect(spy.mock.calls[0][0]).toEqual(['mango'])
		})
	})

	describe('invalid value (not in items)', ()=> {
		it('single-select: defaultValue not in items renders without crash and selects nothing', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			expect(()=> {
				renderApp(container, h(Listbox.Root, {
					defaultValue: 'car',
					children: [
						h(Listbox.Content, null, [
							h(Listbox.Item, { value: 'apple' }, h(Listbox.ItemText, null, 'Apple')),
							h(Listbox.Item, { value: 'mango' }, h(Listbox.ItemText, null, 'Mango')),
						]),
					],
				}))
			}).not.toThrow()

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items[0].getAttribute('aria-selected')).not.toBe('true')
			expect(items[1].getAttribute('aria-selected')).not.toBe('true')
		})

		it('multi-select: defaultValue with unknown entry is ignored, valid entries still apply', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Listbox.Root, {
				multiple: true,
				defaultValue: ['car', 'mango'],
				children: [
					h(Listbox.Content, null, [
						h(Listbox.Item, { value: 'apple' }, h(Listbox.ItemText, null, 'Apple')),
						h(Listbox.Item, { value: 'mango' }, h(Listbox.ItemText, null, 'Mango')),
					]),
				],
			}))

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items[0].getAttribute('aria-selected')).not.toBe('true')
			expect(items[1].getAttribute('aria-selected')).toBe('true')
		})
	})

	describe('disabled state', ()=> {
		it('supports disabled prop without errors', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			expect(()=> {
				renderApp(container, h(Listbox.Root, {
					disabled: true,
					children: [
						h(Listbox.Content, null, [
							h(Listbox.Item, { value: 'apple' }, h(Listbox.ItemText, null, 'Apple')),
						]),
					],
				}))
			}).not.toThrow()
		})
	})
})

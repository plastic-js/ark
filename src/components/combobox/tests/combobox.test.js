// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Combobox } from '../index.js'
import { h, renderApp } from '../../../runtime.js'
import { ListCollection } from '@zag-js/collection'
import { ComponentUnderTest } from './basic.jsx'

const flushRaf = ()=> new Promise(resolve=> requestAnimationFrame(resolve))

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Combobox', ()=> {
	it('renders items from collection', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		const collection = new ListCollection({
			items: [
				{ label: 'Ada', value: 'ada' },
				{ label: 'Grace', value: 'grace' },
			],
		})

		renderApp(container, h(Combobox.Root, {
			collection,
			children: [
				h(Combobox.Label, null, 'Assignee'),
				h(Combobox.Input),
				h(Combobox.Trigger, null, 'Open'),
				h(Combobox.Content, null, [
					h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada')),
					h(Combobox.Item, { item: collection.find('grace') }, h(Combobox.ItemText, null, 'Grace')),
				]),
			],
		}))

		const items = container.querySelectorAll('[data-part="item"]')
		expect(items.length).toBe(2)
		expect(items[0].getAttribute('data-value')).toBe('ada')
		expect(items[1].getAttribute('data-value')).toBe('grace')
	})

	it('calls onOpenChange with true when opening via trigger', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onOpenChange: spy }))

		await user.click(container.querySelector('[data-part="trigger"]'))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	it('calls onValueChange with an array of selected values', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		await user.click(container.querySelector('[data-part="trigger"]'))
		await user.click(container.querySelectorAll('[data-part="item"]')[0])

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toEqual(['ada'])
	})

	it('calls onInputValueChange with the typed string', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onInputValueChange: spy }))

		const input = container.querySelector('[data-part="input"]')
		await user.type(input, 'A')
		await user.tab()

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toBe('A')
	})

	it('calls onHighlightChange with the highlighted value on keyboard navigation', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onHighlightChange: spy }))

		await user.click(container.querySelector('[data-part="trigger"]'))
		await user.keyboard('[ArrowDown]')

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toBe('ada')
	})

	it('calls onSelect with the selected value array', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onSelect: spy }))

		await user.click(container.querySelector('[data-part="trigger"]'))
		await user.click(container.querySelectorAll('[data-part="item"]')[0])

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toEqual(['ada'])
	})

	describe('value shape: single vs multi select', ()=> {
		it('single-select: onValueChange receives an array with one value', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'Apple', value: 'apple' },
					{ label: 'Mango', value: 'mango' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				onValueChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('apple') }, h(Combobox.ItemText, null, 'Apple')),
						h(Combobox.Item, { item: collection.find('mango') }, h(Combobox.ItemText, null, 'Mango')),
					]),
				],
			}))

			await user.click(container.querySelector('[data-part="trigger"]'))
			await user.click(container.querySelectorAll('[data-part="item"]')[1])

			expect(Array.isArray(spy.mock.calls[0][0])).toBe(true)
			expect(spy.mock.calls[0][0]).toEqual(['mango'])
		})

		it('multi-select: onValueChange receives an array that accumulates selections', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'Apple', value: 'apple' },
					{ label: 'Mango', value: 'mango' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				multiple: true,
				onValueChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('apple') }, h(Combobox.ItemText, null, 'Apple')),
						h(Combobox.Item, { item: collection.find('mango') }, h(Combobox.ItemText, null, 'Mango')),
					]),
				],
			}))

			await user.click(container.querySelector('[data-part="trigger"]'))
			const items = container.querySelectorAll('[data-part="item"]')
			await user.click(items[0])
			// In multi-select, the menu stays open after selection — click the second item directly.
			await user.click(items[1])

			const lastCall = spy.mock.calls[spy.mock.calls.length - 1][0]
			expect(Array.isArray(lastCall)).toBe(true)
			expect(lastCall).toEqual(['apple', 'mango'])
		})
	})

	describe('invalid value (not in collection)', ()=> {
		it('single-select: defaultValue not in collection renders without crash', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [
					{ label: 'Apple', value: 'apple' },
					{ label: 'Mango', value: 'mango' },
				],
			})

			expect(()=> {
				renderApp(container, h(Combobox.Root, {
					collection,
					defaultValue: ['car'],
					children: [
						h(Combobox.Input),
						h(Combobox.Trigger, null, 'Open'),
						h(Combobox.Content, null, [
							h(Combobox.Item, { item: collection.find('apple') }, h(Combobox.ItemText, null, 'Apple')),
							h(Combobox.Item, { item: collection.find('mango') }, h(Combobox.ItemText, null, 'Mango')),
						]),
					],
				}))
			}).not.toThrow()

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items[0].getAttribute('data-state')).not.toBe('checked')
			expect(items[1].getAttribute('data-state')).not.toBe('checked')
		})

		it('multi-select: defaultValue with unknown entry is ignored, valid entries still apply', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [
					{ label: 'Apple', value: 'apple' },
					{ label: 'Mango', value: 'mango' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				multiple: true,
				defaultValue: ['car', 'mango'],
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('apple') }, h(Combobox.ItemText, null, 'Apple')),
						h(Combobox.Item, { item: collection.find('mango') }, h(Combobox.ItemText, null, 'Mango')),
					]),
				],
			}))

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items[0].getAttribute('data-state')).not.toBe('checked')
			expect(items[1].getAttribute('data-state')).toBe('checked')
		})
	})

	describe('disabled state', ()=> {
		it('disabled combobox does not open on trigger click', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [
					{ label: 'Ada', value: 'ada' },
					{ label: 'Grace', value: 'grace' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				disabled: true,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada')),
						h(Combobox.Item, { item: collection.find('grace') }, h(Combobox.ItemText, null, 'Grace')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			const content = container.querySelector('[data-part="content"]')

			expect(content.hidden).toBe(true)
			await user.click(trigger)
			expect(content.hidden).toBe(true)
		})

		it('disabled combobox has disabled attribute on input', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [{ label: 'Ada', value: 'ada' }],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				disabled: true,
				children: [h(Combobox.Input)],
			}))

			const input = container.querySelector('[data-part="input"]')
			expect(input.disabled).toBe(true)
		})

		it('disabled combobox has data-disabled on trigger', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [{ label: 'Ada', value: 'ada' }],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				disabled: true,
				children: [
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada'))),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			expect(trigger.dataset.disabled).toBeDefined()
		})

		it('disabled combobox ignores input typing', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [{ label: 'Ada', value: 'ada' }],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				disabled: true,
				onInputValueChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada'))),
				],
			}))

			const input = container.querySelector('[data-part="input"]')
			await user.type(input, 'test')

			expect(spy).not.toHaveBeenCalled()
		})
	})

	describe('asChild', ()=> {
		const collection = new ListCollection({
			items: [
				{
					label: 'GitHub', href: 'https://github.com', value: 'github',
				},
				{
					label: 'MDN', href: 'https://developer.mozilla.org', value: 'mdn',
				},
			],
		})

		it('renders only the child element — no div wrapper for Combobox.Item', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Combobox.Root, { collection }, [
				h(Combobox.Input, null),
				h(Combobox.Trigger, null, 'Open'),
				h(Combobox.Content, null, collection.items.map(item=> h(Combobox.Item, {
					key: item.value, item: collection.find(item.value), asChild: true,
				}, h('a', { href: item.href }, item.label)))),
			]))

			await user.click(container.querySelector('[data-part="trigger"]'))

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items.length).toBe(2)
			items.forEach(el=> expect(el.tagName.toLowerCase()).toBe('a'))
		})

		it('child receives data-part from the item part', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Combobox.Root, { collection }, [
				h(Combobox.Input, null),
				h(Combobox.Trigger, null, 'Open'),
				h(Combobox.Content, null, collection.items.map(item=> h(Combobox.Item, {
					key: item.value, item: collection.find(item.value), asChild: true,
				}, h('a', { href: item.href }, item.label)))),
			]))

			await user.click(container.querySelector('[data-part="trigger"]'))

			const anchors = container.querySelectorAll('a[data-part="item"]')
			expect(anchors.length).toBe(2)
		})

		it('merges event handlers — item select and child onClick both fire', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const childSpy = vi.fn()

			renderApp(container, h(Combobox.Root, { collection }, [
				h(Combobox.Input, null),
				h(Combobox.Trigger, null, 'Open'),
				h(Combobox.Content, null, collection.items.map((item, i)=> h(Combobox.Item, {
					key: item.value, item: collection.find(item.value), asChild: true,
				}, h('a', { href: item.href, ...i === 0 ? { onClick: childSpy } : {} }, item.label)))),
			]))

			await user.click(container.querySelector('[data-part="trigger"]'))
			await user.click(container.querySelector('a[data-part="item"]'))

			expect(childSpy).toHaveBeenCalledOnce()
		})
	})

	describe('keyboard navigation', ()=> {
		it('ArrowDown opens menu and navigates to first item', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'Ada', value: 'ada' },
					{ label: 'Grace', value: 'grace' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				onHighlightChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada')),
						h(Combobox.Item, { item: collection.find('grace') }, h(Combobox.ItemText, null, 'Grace')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			const content = container.querySelector('[data-part="content"]')

			await user.click(trigger)
			await flushRaf()
			await user.keyboard('[ArrowDown]')

			expect(content.hidden).toBe(false)
			expect(spy).toHaveBeenCalled()
			expect(spy.mock.calls[0][0]).toBe('ada')
		})

		it('ArrowDown navigates through items', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'Ada', value: 'ada' },
					{ label: 'Grace', value: 'grace' },
					{ label: 'Rosalind', value: 'rosalind' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				onHighlightChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada')),
						h(Combobox.Item, { item: collection.find('grace') }, h(Combobox.ItemText, null, 'Grace')),
						h(Combobox.Item, { item: collection.find('rosalind') }, h(Combobox.ItemText, null, 'Rosalind')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')

			await user.click(trigger)
			await flushRaf()
			await user.keyboard('[ArrowDown][ArrowDown]')

			expect(spy).toHaveBeenCalled()
			expect(spy.mock.calls[spy.mock.calls.length - 1][0]).toBe('grace')
		})

		it('ArrowUp navigates backwards through items', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'Ada', value: 'ada' },
					{ label: 'Grace', value: 'grace' },
					{ label: 'Rosalind', value: 'rosalind' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				onHighlightChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada')),
						h(Combobox.Item, { item: collection.find('grace') }, h(Combobox.ItemText, null, 'Grace')),
						h(Combobox.Item, { item: collection.find('rosalind') }, h(Combobox.ItemText, null, 'Rosalind')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')

			await user.click(trigger)
			await flushRaf()
			await user.keyboard('[ArrowDown][ArrowDown][ArrowDown][ArrowUp]')

			expect(spy).toHaveBeenCalled()
			expect(spy.mock.calls[spy.mock.calls.length - 1][0]).toBe('grace')
		})

		it('Enter selects highlighted item', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'Ada', value: 'ada' },
					{ label: 'Grace', value: 'grace' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				onValueChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada')),
						h(Combobox.Item, { item: collection.find('grace') }, h(Combobox.ItemText, null, 'Grace')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			const content = container.querySelector('[data-part="content"]')

			await user.click(trigger)
			await flushRaf()
			await user.keyboard('[ArrowDown][ArrowDown][Enter]')

			expect(spy).toHaveBeenCalledWith(['grace'])
			expect(content.hidden).toBe(true)
		})

		it('Escape closes menu without selecting', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'Ada', value: 'ada' },
					{ label: 'Grace', value: 'grace' },
				],
			})

			renderApp(container, h(Combobox.Root, {
				collection,
				onValueChange: spy,
				children: [
					h(Combobox.Input),
					h(Combobox.Trigger, null, 'Open'),
					h(Combobox.Content, null, [
						h(Combobox.Item, { item: collection.find('ada') }, h(Combobox.ItemText, null, 'Ada')),
						h(Combobox.Item, { item: collection.find('grace') }, h(Combobox.ItemText, null, 'Grace')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			const content = container.querySelector('[data-part="content"]')

			await user.click(trigger)
			await flushRaf()
			await user.keyboard('[ArrowDown][Escape]')

			expect(spy).not.toHaveBeenCalled()
			expect(content.hidden).toBe(true)
		})
	})
})

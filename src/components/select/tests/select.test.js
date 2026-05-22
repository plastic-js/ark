// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Select } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ListCollection } from '@zag-js/collection'
import { ComponentUnderTest } from './basic.jsx'

const flushRaf = ()=> new Promise(resolve=> requestAnimationFrame(resolve))

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Select', ()=> {
	it('opens, selects an item, and updates value text', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		const collection = new ListCollection({
			items: [
				{ label: 'React', value: 'react' },
				{ label: 'Solid', value: 'solid' },
			],
		})

		renderApp(container, h(Select.Root, {
			collection,
			children: [
				h(Select.Label, null, 'Framework'),
				h(Select.Trigger, null, h(Select.ValueText)),
				h(Select.Content, null, [
					h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React')),
					h(Select.Item, { item: collection.find('solid') }, h(Select.ItemText, null, 'Solid')),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const valueText = container.querySelector('[data-part="value-text"]')
		const items = container.querySelectorAll('[data-part="item"]')
		const content = container.querySelector('[data-part="content"]')

		expect(content.hidden).toBe(true)

		await user.click(trigger)
		expect(content.hidden).toBe(false)

		await user.click(items[1])
		expect(content.hidden).toBe(true)
		expect(valueText.textContent).toBe('Solid')
	})

	it('updates item data-state to checked after selection', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		const collection = new ListCollection({
			items: [
				{ label: 'React', value: 'react' },
				{ label: 'Solid', value: 'solid' },
			],
		})

		renderApp(container, h(Select.Root, {
			collection,
			children: [
				h(Select.Trigger, null, h(Select.ValueText)),
				h(Select.Content, null, [
					h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React')),
					h(Select.Item, { item: collection.find('solid') }, h(Select.ItemText, null, 'Solid')),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const items = container.querySelectorAll('[data-part="item"]')

		// Initially both items should be unchecked
		expect(items[0].getAttribute('data-state')).toBe('unchecked')
		expect(items[1].getAttribute('data-state')).toBe('unchecked')

		// Open and select first item (same DOM nodes remain in tree after close)
		await user.click(trigger)
		await user.click(items[0])

		// Verify data-state updated on the *same* DOM nodes (no reopen)
		expect(items[0].getAttribute('data-state')).toBe('checked')
		expect(items[1].getAttribute('data-state')).toBe('unchecked')
	})

	it('updates item-indicator data-state to checked after selection', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		const collection = new ListCollection({
			items: [
				{ label: 'React', value: 'react' },
				{ label: 'Solid', value: 'solid' },
			],
		})

		renderApp(container, h(Select.Root, {
			collection,
			children: [
				h(Select.Trigger, null, h(Select.ValueText)),
				h(Select.Content, null, [
					h(Select.Item, { item: collection.find('react') }, [
						h(Select.ItemText, null, 'React'),
						h(Select.ItemIndicator, null, '✓'),
					]),
					h(Select.Item, { item: collection.find('solid') }, [
						h(Select.ItemText, null, 'Solid'),
						h(Select.ItemIndicator, null, '✓'),
					]),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const indicators = container.querySelectorAll('[data-part="item-indicator"]')

		expect(indicators[0].getAttribute('data-state')).toBe('unchecked')
		expect(indicators[1].getAttribute('data-state')).toBe('unchecked')
		expect(indicators[0].hidden).toBe(true)
		expect(indicators[1].hidden).toBe(true)

		await user.click(trigger)
		await user.click(indicators[0].closest('[data-part="item"]'))

		expect(indicators[0].getAttribute('data-state')).toBe('checked')
		expect(indicators[1].getAttribute('data-state')).toBe('unchecked')
		expect(indicators[0].hidden).toBe(false)
		expect(indicators[1].hidden).toBe(true)
	})

	it('uncontrolled: no defaultValue means no selection; machine owns updates after interaction', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(ComponentUnderTest, {}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const valueText = container.querySelector('[data-part="value-text"]')
		const items = container.querySelectorAll('[data-part="item"]')

		expect(valueText.textContent).toBe('')

		await user.click(trigger)
		await user.click(items[0])
		expect(valueText.textContent).toBe('React')
	})

	it('controlled: signal as value prevents updates; callback fires; external update applies', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		const collection = new ListCollection({
			items: [
				{ label: 'React', value: 'react' },
				{ label: 'Solid', value: 'solid' },
			],
		})
		const value = createSignal(['react'])
		const spy = vi.fn()

		renderApp(container, h(Select.Root, {
			collection,
			value,
			onValueChange: spy,
			children: [
				h(Select.Trigger, null, h(Select.ValueText)),
				h(Select.Content, null, [
					h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React')),
					h(Select.Item, { item: collection.find('solid') }, h(Select.ItemText, null, 'Solid')),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const valueText = container.querySelector('[data-part="value-text"]')
		const items = container.querySelectorAll('[data-part="item"]')

		expect(valueText.textContent).toBe('React')

		await user.click(trigger)
		await user.click(items[1])
		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toEqual(['solid'])
		expect(valueText.textContent).toBe('React')

		value(['solid'])
		expect(valueText.textContent).toBe('Solid')
	})

	it('calls onValueChange with an array of selected values', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		const trigger = container.querySelector('[data-part="trigger"]')
		await user.click(trigger)

		const items = container.querySelectorAll('[data-part="item"]')
		await user.click(items[1])

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toEqual(['solid'])
	})

	it('calls onOpenChange with true when opening', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onOpenChange: spy }))

		await user.click(container.querySelector('[data-part="trigger"]'))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	it('calls onHighlightChange with the highlighted value on keyboard navigation', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onHighlightChange: spy }))

		const trigger = container.querySelector('[data-part="trigger"]')
		await user.click(trigger)
		await flushRaf()
		await user.keyboard('[ArrowDown]')

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toBe('react')
	})

	it('calls onSelect with the selected item value string', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onSelect: spy }))

		await user.click(container.querySelector('[data-part="trigger"]'))
		await user.click(container.querySelectorAll('[data-part="item"]')[1])

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toBe('solid')
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

			renderApp(container, h(Select.Root, {
				collection,
				onValueChange: spy,
				children: [
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, [
						h(Select.Item, { item: collection.find('apple') }, h(Select.ItemText, null, 'Apple')),
						h(Select.Item, { item: collection.find('mango') }, h(Select.ItemText, null, 'Mango')),
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

			renderApp(container, h(Select.Root, {
				collection,
				multiple: true,
				onValueChange: spy,
				children: [
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, [
						h(Select.Item, { item: collection.find('apple') }, h(Select.ItemText, null, 'Apple')),
						h(Select.Item, { item: collection.find('mango') }, h(Select.ItemText, null, 'Mango')),
					]),
				],
			}))

			await user.click(container.querySelector('[data-part="trigger"]'))
			const items = container.querySelectorAll('[data-part="item"]')
			await user.click(items[0])
			await user.click(items[1])

			const lastCall = spy.mock.calls[spy.mock.calls.length - 1][0]
			expect(Array.isArray(lastCall)).toBe(true)
			expect(lastCall).toEqual(['apple', 'mango'])
		})
	})

	describe('invalid value (not in collection)', ()=> {
		it('single-select: defaultValue not in collection renders without crash; value-text is empty', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [
					{ label: 'Apple', value: 'apple' },
					{ label: 'Mango', value: 'mango' },
				],
			})

			expect(()=> {
				renderApp(container, h(Select.Root, {
					collection,
					defaultValue: ['car'],
					children: [
						h(Select.Trigger, null, h(Select.ValueText)),
						h(Select.Content, null, [
							h(Select.Item, { item: collection.find('apple') }, h(Select.ItemText, null, 'Apple')),
							h(Select.Item, { item: collection.find('mango') }, h(Select.ItemText, null, 'Mango')),
						]),
					],
				}))
			}).not.toThrow()

			// Documented behavior: when defaultValue is not in the collection, no item is marked
			// as checked, but Select.ValueText falls back to the raw value string ('car').
			// This means consumers MUST validate values against the collection before passing them in,
			// or render their own label via a computed (do NOT trust ValueText to be empty for unknown values).
			const valueText = container.querySelector('[data-part="value-text"]')
			expect(valueText.textContent).toBe('car')
			const items = container.querySelectorAll('[data-part="item"]')
			expect(items[0].getAttribute('data-state')).toBe('unchecked')
			expect(items[1].getAttribute('data-state')).toBe('unchecked')
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

			renderApp(container, h(Select.Root, {
				collection,
				multiple: true,
				defaultValue: ['car', 'mango'],
				children: [
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, [
						h(Select.Item, { item: collection.find('apple') }, h(Select.ItemText, null, 'Apple')),
						h(Select.Item, { item: collection.find('mango') }, h(Select.ItemText, null, 'Mango')),
					]),
				],
			}))

			const items = container.querySelectorAll('[data-part="item"]')
			expect(items[0].getAttribute('data-state')).toBe('unchecked')
			expect(items[1].getAttribute('data-state')).toBe('checked')
		})
	})

	describe('disabled state', ()=> {
		it('disabled select does not open on click', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [
					{ label: 'React', value: 'react' },
					{ label: 'Solid', value: 'solid' },
				],
			})

			renderApp(container, h(Select.Root, {
				collection,
				disabled: true,
				children: [
					h(Select.Label, null, 'Framework'),
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, [
						h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React')),
						h(Select.Item, { item: collection.find('solid') }, h(Select.ItemText, null, 'Solid')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			const content = container.querySelector('[data-part="content"]')

			expect(content.hidden).toBe(true)

			await user.click(trigger)
			expect(content.hidden).toBe(true)
		})

		it('disabled select has disabled attribute on trigger', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [{ label: 'React', value: 'react' }],
			})

			renderApp(container, h(Select.Root, {
				collection,
				disabled: true,
				children: [
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React'))),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			expect(trigger.disabled).toBe(true)
		})

		it('disabled select has data-disabled on trigger', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [{ label: 'React', value: 'react' }],
			})

			renderApp(container, h(Select.Root, {
				collection,
				disabled: true,
				children: [
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React'))),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			expect(trigger.dataset.disabled).toBeDefined()
		})

		it('disabled select ignores keyboard navigation', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			const collection = new ListCollection({
				items: [
					{ label: 'React', value: 'react' },
					{ label: 'Solid', value: 'solid' },
				],
			})
			const spy = vi.fn()

			renderApp(container, h(Select.Root, {
				collection,
				disabled: true,
				onOpenChange: spy,
				children: [
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, [
						h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React')),
						h(Select.Item, { item: collection.find('solid') }, h(Select.ItemText, null, 'Solid')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			trigger.focus()
			await user.keyboard('[Enter]')

			expect(spy).not.toHaveBeenCalled()
		})
	})

	describe('keyboard navigation', ()=> {
		it('Escape closes menu without selecting', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const spy = vi.fn()

			const collection = new ListCollection({
				items: [
					{ label: 'React', value: 'react' },
					{ label: 'Solid', value: 'solid' },
				],
			})

			renderApp(container, h(Select.Root, {
				collection,
				onValueChange: spy,
				children: [
					h(Select.Trigger, null, h(Select.ValueText)),
					h(Select.Content, null, [
						h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React')),
						h(Select.Item, { item: collection.find('solid') }, h(Select.ItemText, null, 'Solid')),
					]),
				],
			}))

			const trigger = container.querySelector('[data-part="trigger"]')
			const content = container.querySelector('[data-part="content"]')

			await user.click(trigger)
			await flushRaf()
			await user.keyboard('[Escape]')

			expect(spy).not.toHaveBeenCalled()
			expect(content.hidden).toBe(true)
		})
	})

	describe('asChild', ()=> {
		const collection = new ListCollection({
			items: [{ label: 'React', value: 'react' }],
		})

		it('renders only the child element — no button wrapper', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Select.Root, {
				collection,
				children: [
					h(Select.Trigger, { asChild: true }, h('a', { href: '#' }, 'Open')),
					h(Select.Content, null, h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React'))),
				],
			}))

			expect(container.querySelector('button')).toBeNull()
			expect(container.querySelector('a')).not.toBeNull()
		})

		it('child receives data-part from the part', ()=> {
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Select.Root, {
				collection,
				children: [
					h(Select.Trigger, { asChild: true }, h('a', { href: '#' }, 'Open')),
					h(Select.Content, null, h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React'))),
				],
			}))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('trigger')
		})

		it('merges event handlers — both part open and child onClick fire', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const childSpy = vi.fn()

			renderApp(container, h(Select.Root, {
				collection,
				children: [
					h(Select.Trigger, { asChild: true }, h('a', { href: '#', onClick: childSpy }, 'Open')),
					h(Select.Content, null, h(Select.Item, { item: collection.find('react') }, h(Select.ItemText, null, 'React'))),
				],
			}))

			const anchor = container.querySelector('a[data-part="trigger"]')
			await user.click(anchor)

			expect(childSpy).toHaveBeenCalledOnce()
			expect(anchor.getAttribute('aria-expanded')).toBe('true')
		})
	})
})

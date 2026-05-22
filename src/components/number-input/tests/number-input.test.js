// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { NumberInput } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

describe('@ark-ui/plastic NumberInput', ()=> {
	it('increments, decrements, and clamps from keyboard controls', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(NumberInput.Root, {
			defaultValue: 4,
			max: 10,
			min: 0,
			step: 2,
			children: [
				h(NumberInput.Label, null, 'Count'),
				h(NumberInput.DecrementTrigger, null, '-'),
				h(NumberInput.Input),
				h(NumberInput.IncrementTrigger, null, '+'),
				h(NumberInput.ValueText),
			],
		}))

		const input = container.querySelector('[data-part="input"]')
		const increment = container.querySelector('[data-part="increment-trigger"]')
		const decrement = container.querySelector('[data-part="decrement-trigger"]')
		const valueText = container.querySelector('[data-part="value-text"]')

		increment.click()
		expect(input.value).toBe('6')

		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
		expect(input.value).toBe('4')

		decrement.click()
		decrement.click()
		decrement.click()
		expect(input.value).toBe('0')
		expect(valueText.textContent).toBe('0')
	})

	it('calls onValueChange with the new string value after increment', ()=> {
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		container.querySelector('[data-part="increment-trigger"]').click()

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe('6')
	})

	it('shows an empty string when the numeric value is NaN without changing the underlying value', ()=> {
		const container = document.createElement('div')
		const value = createSignal(Number.NaN)

		renderApp(container, h(NumberInput.Root, {
			value,
			onValueChange: value,
			children: [
				h(NumberInput.Input),
			],
		}))

		const input = container.querySelector('[data-part="input"]')

		expect(input.value).toBe('')
		expect(Number.isNaN(value())).toBe(true)
	})

	it('keeps the input display empty after clearing the current number', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(NumberInput.Root, {
			defaultValue: 4,
			children: [
				h(NumberInput.Label, null, 'Count'),
				h(NumberInput.Input),
			],
		}))

		const input = container.querySelector('[data-part="input"]')

		input.value = ''
		input.dispatchEvent(new Event('input', { bubbles: true }))
		input.dispatchEvent(new FocusEvent('blur', { bubbles: true }))

		expect(input.value).toBe('')
	})

	it('keeps the input display empty while focused after deleting the last digit', async()=> {
		const container = document.createElement('div')
		const user = userEvent.setup()
		document.body.append(container)

		renderApp(container, h(NumberInput.Root, {
			defaultValue: 4,
			children: [
				h(NumberInput.Label, null, 'Count'),
				h(NumberInput.Input),
			],
		}))

		const input = container.querySelector('[data-part="input"]')

		await user.click(input)
		await user.keyboard('{Backspace}')

		expect(document.activeElement).toBe(input)
		expect(input.value).toBe('')
	})

	it('updates the value when typing and deleting digits manually', async()=> {
		const container = document.createElement('div')
		const user = userEvent.setup()
		document.body.append(container)

		renderApp(container, h(NumberInput.Root, {
			defaultValue: 4,
			children: [
				h(NumberInput.Input),
			],
		}))

		const input = container.querySelector('[data-part="input"]')

		await user.click(input)
		await user.keyboard('{Backspace}7')
		expect(input.value).toBe('7')

		await user.keyboard('{Backspace}')
		expect(input.value).toBe('')
	})

	describe('disabled state', ()=> {
		it('disabled input has data-disabled on input field', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(NumberInput.Root, {
				defaultValue: 5,
				disabled: true,
				children: [h(NumberInput.Input)],
			}))

			const input = container.querySelector('[data-part="input"]')
			expect(input.dataset.disabled).toBeDefined()
		})

		it('disabled input has data-disabled on increment trigger', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(NumberInput.Root, {
				defaultValue: 5,
				disabled: true,
				children: [
					h(NumberInput.IncrementTrigger, null, '+'),
					h(NumberInput.Input),
				],
			}))

			const increment = container.querySelector('[data-part="increment-trigger"]')
			expect(increment.dataset.disabled).toBeDefined()
		})

		it('disabled input has data-disabled on decrement trigger', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(NumberInput.Root, {
				defaultValue: 5,
				disabled: true,
				children: [
					h(NumberInput.DecrementTrigger, null, '-'),
					h(NumberInput.Input),
				],
			}))

			const decrement = container.querySelector('[data-part="decrement-trigger"]')
			expect(decrement.dataset.disabled).toBeDefined()
		})

		it('disabled input disables the increment trigger', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(NumberInput.Root, {
				defaultValue: 5,
				disabled: true,
				children: [
					h(NumberInput.IncrementTrigger, null, '+'),
					h(NumberInput.Input),
				],
			}))

			const increment = container.querySelector('[data-part="increment-trigger"]')
			expect(increment.disabled).toBe(true)
		})
	})
})

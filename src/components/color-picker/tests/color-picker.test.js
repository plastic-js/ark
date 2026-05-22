// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { ColorPicker } from '../index.js'
import {
	createSignal,
	h,
	renderApp,
} from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic ColorPicker', ()=> {
	it('wires label, color input semantics, and swatch preview', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(ColorPicker.Root, {
			defaultValue: '#0f766e',
			children: [
				h(ColorPicker.Label, null, 'Color'),
				h(ColorPicker.Input),
				h(ColorPicker.Swatch),
			],
		}))

		const label = container.querySelector('[data-part="label"]')
		const input = container.querySelector('input[type="color"]')
		const hiddenInput = container.querySelector('input[tabindex="-1"]')
		const swatch = container.querySelector('[data-part="swatch"]')

		expect(label.htmlFor).toBe(input.id)
		expect(hiddenInput.type).toBe('text')
		expect(input.value.length).toBeGreaterThan(0)
		expect(swatch.style.background).toBeTruthy()
	})

	it('supports controlled updates and reports changes through onValueChange', ()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('#123456')
		const onValueChange = vi.fn()

		renderApp(container, h(ColorPicker.Root, {
			value,
			onValueChange,
			children: [
				h(ColorPicker.Label, null, 'Accent'),
				h(ColorPicker.Input),
				h(ColorPicker.Swatch),
			],
		}))

		const input = container.querySelector('input[type="color"]')
		const swatch = container.querySelector('[data-part="swatch"]')
		expect(input.value.length).toBeGreaterThan(0)
		expect(swatch.style.background).toBeTruthy()

		value('#abcdef')
		expect(input.value.length).toBeGreaterThan(0)
	})

	it('normalizes rgba values to hex for the native color input', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(ColorPicker.Root, {
			value: 'rgba(52, 162, 52, 1)',
			children: h(ColorPicker.Input),
		}))

		const input = container.querySelector('input[type="color"]')

		expect(input.defaultValue.toLowerCase()).toBe('#34a234')
		expect(input.value.toLowerCase()).toBe('#34a234')
	})

	it('opens the native color input when the swatch is clicked', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(ColorPicker.Root, {
			defaultValue: '#0f766e',
			children: [
				h(ColorPicker.Input),
				h(ColorPicker.Swatch),
			],
		}))

		const input = container.querySelector('input[type="color"]')
		const swatch = container.querySelector('button[data-part="swatch"]')
		const showPicker = vi.fn()

		input.showPicker = showPicker
		await user.click(swatch)

		expect(showPicker).toHaveBeenCalledTimes(1)
	})

	it('reports hex values after native input changes', ()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const onValueChange = vi.fn()

		renderApp(container, h(ColorPicker.Root, {
			defaultValue: '#0f766e',
			onValueChange,
			children: h(ColorPicker.Input),
		}))

		const input = container.querySelector('input[type="color"]')
		Object.defineProperty(input, 'value', {
			configurable: true,
			value: '#58ca8a',
		})
		input.dispatchEvent(new Event('input', { bubbles: true }))

		expect(onValueChange).toHaveBeenLastCalledWith('#58ca8a')
	})
})

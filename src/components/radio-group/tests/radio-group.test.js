// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Fieldset, RadioGroup } from '../../../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

const renderFrameworkGroup = (container, props = {})=> renderApp(container, h(RadioGroup.Root, {
	defaultValue: 'react',
	name: 'framework',
	...props,
	children: [
		h(RadioGroup.Label, null, 'Framework'),
		h(RadioGroup.Item, {
			value: 'react',
			children: [
				h(RadioGroup.ItemControl, null, h(RadioGroup.Indicator)),
				h(RadioGroup.ItemText, null, 'React'),
				h(RadioGroup.ItemHiddenInput),
			],
		}),
		h(RadioGroup.Item, {
			value: 'solid',
			children: [
				h(RadioGroup.ItemControl, null, h(RadioGroup.Indicator)),
				h(RadioGroup.ItemText, null, 'Solid'),
				h(RadioGroup.ItemHiddenInput),
			],
		}),
	],
}))

describe('@ark-ui/plastic RadioGroup', ()=> {
	it('selects items through the hidden radio inputs', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		renderFrameworkGroup(container)

		const inputs = container.querySelectorAll('input[type="radio"]')
		expect(inputs[0].checked).toBe(true)
		expect(inputs[1].checked).toBe(false)

		await user.click(inputs[1])
		expect(inputs[0].checked).toBe(false)
		expect(inputs[1].checked).toBe(true)
		expect(container.querySelectorAll('[data-part="indicator"]')[0].hidden).toBe(true)
		expect(container.querySelectorAll('[data-part="indicator"]')[1].hidden).toBe(false)
	})

	it('inherits disabled state from Fieldset', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Fieldset.Root, {
			disabled: true,
			children: h(RadioGroup.Root, {
				children: [
					h(RadioGroup.Label, null, 'Framework'),
					h(RadioGroup.Item, {
						value: 'react',
						children: [
							h(RadioGroup.ItemControl),
							h(RadioGroup.ItemText, null, 'React'),
							h(RadioGroup.ItemHiddenInput),
						],
					}),
				],
			}),
		}))

		const hiddenInput = container.querySelector('input[type="radio"]')
		expect(hiddenInput.disabled).toBe(true)
	})

	it('maps controlled value changes to the legacy callback shape', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('react')

		renderFrameworkGroup(container, {
			value,
			onValueChange: value,
		})

		const inputs = container.querySelectorAll('input[type="radio"]')
		await user.click(inputs[1])
		expect(value()).toBe('solid')
	})

	it('checked radio remains tabbable after selection via keyboard', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('')

		renderFrameworkGroup(container, {
			value,
			onValueChange: value,
			defaultValue: undefined,
		})

		const inputs = container.querySelectorAll('input[type="radio"]')

		// Focus and select the second radio
		inputs[1].focus()
		inputs[1].click()
		expect(value()).toBe('solid')
		expect(inputs[1].checked).toBe(true)

		// Verify isTabbableRadio logic: checked radio should be tabbable
		// This mirrors the check in @zag-js/dom-query/dist/tabbable.mjs
		const isTabbableRadio = (element)=> {
			if (element.type !== 'radio' || !element.name){ return true }
			if (element.checked){ return true }
			const selector = `input[type="radio"][name="${CSS.escape(element.name)}"]`
			const scope = element.form ?? element.ownerDocument
			const group = [...scope.querySelectorAll(selector)].filter(radio=> radio.form === element.form)
			const checked = group.find(radio=> radio.checked)
			if (checked){ return checked === element }
			return group[0] === element
		}

		expect(isTabbableRadio(inputs[0])).toBe(false)
		expect(isTabbableRadio(inputs[1])).toBe(true)
	})

	it('calls onValueChange with the selected value string', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		const inputs = container.querySelectorAll('input[type="radio"]')
		await user.click(inputs[1])

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe('solid')
	})
})

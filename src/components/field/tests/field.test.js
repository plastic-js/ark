// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { Field, fieldAnatomy } from '../index.js'
import { h, renderApp } from '../../../runtime.js'

describe('@ark-ui/plastic Field', ()=> {
	it('exposes the expected namespace parts', ()=> {
		expect(Field.Root).toBe(Field)
		expect(Field.Input).toBeTypeOf('function')
		expect(fieldAnatomy.keys()).toEqual([
			'root',
			'errorText',
			'helperText',
			'input',
			'label',
			'select',
			'textarea',
			'requiredIndicator',
		])
	})

	it('wires label, helper text, and error text to the control', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Field.Root, {
			required: true,
			invalid: true,
			children: [
				h(Field.Label, null, 'Email'),
				h(Field.Input, { type: 'email' }),
				h(Field.HelperText, null, 'We only use this for receipts'),
				h(Field.ErrorText, null, 'Email is required'),
				h(Field.RequiredIndicator, null, '*'),
			],
		}))

		const label = container.querySelector('label')
		const input = container.querySelector('input')
		const helperText = container.querySelector('[data-part="helper-text"]')
		const errorText = container.querySelector('[data-part="error-text"]')
		const requiredIndicator = container.querySelector('[data-part="required-indicator"]')

		expect(label.htmlFor).toBe(input.id)
		expect(input.getAttribute('aria-labelledby')).toBe(label.id)
		expect(input.getAttribute('aria-describedby')).toBe(`${errorText.id} ${helperText.id}`)
		expect(input.getAttribute('aria-invalid')).toBe('true')
		expect(input.required).toBe(true)
		expect(requiredIndicator.getAttribute('aria-hidden')).toBe('true')
	})
})

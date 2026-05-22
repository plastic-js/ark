// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { Fieldset, fieldsetAnatomy } from '../index.js'
import { h, renderApp } from '../../../runtime.js'

describe('@ark-ui/plastic Fieldset', ()=> {
	it('exposes the expected namespace parts', ()=> {
		expect(Fieldset.Root).toBe(Fieldset)
		expect(Fieldset.Legend).toBeTypeOf('function')
		expect(fieldsetAnatomy.keys()).toEqual(['root', 'errorText', 'helperText', 'legend'])
	})

	it('wires legend and described-by text to the fieldset root', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Fieldset.Root, {
			invalid: true,
			disabled: true,
			children: [
				h(Fieldset.Legend, null, 'Preferences'),
				h(Fieldset.HelperText, null, 'Choose one option'),
				h(Fieldset.ErrorText, null, 'Selection required'),
			],
		}))

		const root = container.querySelector('fieldset')
		const legend = container.querySelector('[data-part="legend"]')
		const helperText = container.querySelector('[data-part="helper-text"]')
		const errorText = container.querySelector('[data-part="error-text"]')

		expect(root.getAttribute('aria-labelledby')).toBe(legend.id)
		expect(root.getAttribute('aria-describedby')).toBe(`${errorText.id} ${helperText.id}`)
		expect(root.disabled).toBe(true)
		expect(root.dataset.invalid).toBe('')
	})
})

// @vitest-environment jsdom

import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { SignaturePad } from '../index.js'
import { h, renderApp } from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic SignaturePad', ()=> {
	it('renders and supports clearing', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(SignaturePad.Root, {
			children: [
				h(SignaturePad.Canvas),
				h(SignaturePad.ClearTrigger, null, 'Clear'),
			],
		}))

		const clearTrigger = container.querySelector('[data-part="clear-trigger"]')
		expect(clearTrigger.hidden).toBe(true)
	})
})

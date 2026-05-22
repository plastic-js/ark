// @vitest-environment jsdom

import { createSignal } from '../../../runtime.js'
import { describe, expect, it } from 'vitest'
import { Progress } from '../index.js'
import { h, renderApp } from '../../../runtime.js'

describe('@ark-ui/plastic Progress', ()=> {
	it('formats value text and updates the range width', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Progress.Root, {
			getValueText: value=> `${value}%`,
			max: 200,
			value: 50,
			children: [
				h(Progress.Label, null, 'Upload'),
				h(Progress.Track, null, h(Progress.Range)),
				h(Progress.ValueText),
			],
		}))

		const root = container.querySelector('[data-part="root"]')
		const range = container.querySelector('[data-part="range"]')
		const valueText = container.querySelector('[data-part="value-text"]')

		expect(root.getAttribute('aria-valuenow')).toBe('50')
		expect(range.style.width).toBe('25%')
		expect(valueText.textContent).toBe('50%')
	})

	it('reacts to controlled value updates', ()=> {
		const container = document.createElement('div')
		const value = createSignal(60)

		renderApp(container, h(Progress.Root, {
			getValueText: next=> `${next}% uploaded`,
			max: 100,
			onValueChange: value,
			value,
			children: [
				h(Progress.Label, null, 'Upload progress'),
				h(Progress.Track, null, h(Progress.Range)),
				h(Progress.ValueText),
			],
		}))

		const root = container.querySelector('[data-part="root"]')
		const range = container.querySelector('[data-part="range"]')
		const valueText = container.querySelector('[data-part="value-text"]')

		expect(root.getAttribute('aria-valuenow')).toBe('60')
		expect(range.style.width).toBe('60%')
		expect(valueText.textContent).toBe('60% uploaded')

		value(70)

		expect(root.getAttribute('aria-valuenow')).toBe('70')
		expect(range.style.width).toBe('70%')
		expect(valueText.textContent).toBe('70% uploaded')
	})
})

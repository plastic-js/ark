// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import { Slider } from '../index.js'
import { h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

describe('@ark-ui/plastic Slider', ()=> {
	it('supports single-value keyboard precision and value text formatting', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Slider.Root, {
			defaultValue: 20,
			getValueText: value=> `${value}%`,
			max: 100,
			min: 0,
			step: 10,
			children: [
				h(Slider.Label, null, 'Volume'),
				h(Slider.Track, null, h(Slider.Range)),
				h(Slider.Thumb),
				h(Slider.HiddenInput),
				h(Slider.ValueText),
			],
		}))

		const thumb = container.querySelector('[data-part="thumb"]')
		const hiddenInput = container.querySelector('[data-part="hidden-input"]')
		const valueText = container.querySelector('[data-part="value-text"]')

		thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
		expect(hiddenInput.value).toBe('30')
		expect(valueText.textContent).toBe('30%')
	})

	it('updates the nearest thumb from pointer input in range mode', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Slider.Root, {
			defaultValue: [20, 80],
			max: 100,
			min: 0,
			step: 10,
			children: [
				h(Slider.Track, null, h(Slider.Range)),
				h(Slider.Thumb, { 'data-index': 0 }),
				h(Slider.Thumb, { 'data-index': 1 }),
				h(Slider.HiddenInput, { 'data-index': 0 }),
				h(Slider.HiddenInput, { 'data-index': 1 }),
			],
		}))

		const track = container.querySelector('[data-part="track"]')
		const inputs = ()=> container.querySelectorAll('[data-part="hidden-input"]')
		track.getBoundingClientRect = ()=> ({
			bottom: 0,
			height: 10,
			left: 0,
			right: 100,
			top: 0,
			width: 100,
		})

		const pointerDownEvent = new Event('pointerdown', { bubbles: true })
		Object.assign(pointerDownEvent, {
			button: 0,
			clientX: 70,
			clientY: 0,
			pointerType: 'mouse',
		})
		track.dispatchEvent(pointerDownEvent)
		expect(inputs()[1].value).toBe('70')
	})

	it('calls onValueChange with the new numeric value after keyboard step', ()=> {
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		const thumb = container.querySelector('[data-part="thumb"]')
		thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(30)
	})

	describe('disabled state', ()=> {
		it('disabled slider has data-disabled attribute on thumb', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Slider.Root, {
				defaultValue: 20,
				disabled: true,
				children: [
					h(Slider.Track, null, h(Slider.Range)),
					h(Slider.Thumb),
				],
			}))

			const thumb = container.querySelector('[data-part="thumb"]')
			expect(thumb.dataset.disabled).toBeDefined()
		})

		it('disabled slider has aria-disabled on thumb', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Slider.Root, {
				defaultValue: 20,
				disabled: true,
				children: [
					h(Slider.Track, null, h(Slider.Range)),
					h(Slider.Thumb),
				],
			}))

			const thumb = container.querySelector('[data-part="thumb"]')
			expect(thumb.getAttribute('aria-disabled')).toBe('true')
		})

		it('disabled slider has data-disabled on track', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Slider.Root, {
				defaultValue: 20,
				disabled: true,
				children: [h(Slider.Track, null, h(Slider.Range))],
			}))

			const track = container.querySelector('[data-part="track"]')
			expect(track.dataset.disabled).toBeDefined()
		})
	})
})

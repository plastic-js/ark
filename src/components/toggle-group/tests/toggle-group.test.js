// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import { h, renderApp } from '../../../runtime.js'
import { ToggleGroup } from '../toggle-group.js'

describe('ToggleGroup', ()=> {
	it('renders items and selects on click', ()=> {
		const onChange = vi.fn()
		const container = document.createElement('div')

		renderApp(container, h(ToggleGroup.Root, { onValueChange: onChange }, h(ToggleGroup.Item, { value: 'a' }), h(ToggleGroup.Item, { value: 'b' })))

		const buttons = container.querySelectorAll('button')
		expect(buttons.length).toBe(2)

		buttons[0].click()
		expect(onChange).toHaveBeenCalledWith(['a'])
	})

	it('switches selection when clicking a different item', ()=> {
		const onChange = vi.fn()
		const container = document.createElement('div')

		renderApp(container, h(ToggleGroup.Root, { onValueChange: onChange, defaultValue: ['a'] }, h(ToggleGroup.Item, { value: 'a' }), h(ToggleGroup.Item, { value: 'b' })))

		const buttons = container.querySelectorAll('button')
		onChange.mockClear()
		buttons[1].click()
		expect(onChange).toHaveBeenCalledWith(['b'])
	})

	it('deselectable=true (default) deselects on re-click and fires onChange', ()=> {
		const onChange = vi.fn()
		const container = document.createElement('div')

		renderApp(container, h(ToggleGroup.Root, { onValueChange: onChange, defaultValue: ['a'] }, h(ToggleGroup.Item, { value: 'a' }), h(ToggleGroup.Item, { value: 'b' })))

		const buttons = container.querySelectorAll('button')
		onChange.mockClear()
		buttons[0].click()
		expect(onChange).toHaveBeenCalledWith([])
	})

	it('deselectable=false still fires onChange when re-clicking selected item', ()=> {
		const onChange = vi.fn()
		const container = document.createElement('div')

		renderApp(container, h(ToggleGroup.Root, {
			onValueChange: onChange, deselectable: false, defaultValue: ['a'],
		}, h(ToggleGroup.Item, { value: 'a' }), h(ToggleGroup.Item, { value: 'b' })))

		const buttons = container.querySelectorAll('button')
		onChange.mockClear()
		buttons[0].click()
		expect(onChange).toHaveBeenCalledWith(['a'])
	})

	it('deselectable=false still fires onChange when clicking a different item', ()=> {
		const onChange = vi.fn()
		const container = document.createElement('div')

		renderApp(container, h(ToggleGroup.Root, {
			onValueChange: onChange, deselectable: false, defaultValue: ['a'],
		}, h(ToggleGroup.Item, { value: 'a' }), h(ToggleGroup.Item, { value: 'b' })))

		const buttons = container.querySelectorAll('button')
		onChange.mockClear()
		buttons[1].click()
		expect(onChange).toHaveBeenCalledWith(['b'])
	})

	it('deselectable=false in controlled mode still fires onChange on re-click', ()=> {
		const onChange = vi.fn()
		const container = document.createElement('div')

		renderApp(container, h(ToggleGroup.Root, {
			onValueChange: onChange, deselectable: false, value: ()=> ['a'],
		}, h(ToggleGroup.Item, { value: 'a' }), h(ToggleGroup.Item, { value: 'b' })))

		const buttons = container.querySelectorAll('button')
		onChange.mockClear()
		buttons[0].click()
		expect(onChange).toHaveBeenCalledWith(['a'])
	})

	it('deselectable=false in controlled mode fires onChange on different item', ()=> {
		const onChange = vi.fn()
		const container = document.createElement('div')

		renderApp(container, h(ToggleGroup.Root, {
			onValueChange: onChange, deselectable: false, value: ()=> ['a'],
		}, h(ToggleGroup.Item, { value: 'a' }), h(ToggleGroup.Item, { value: 'b' })))

		const buttons = container.querySelectorAll('button')
		onChange.mockClear()
		buttons[1].click()
		expect(onChange).toHaveBeenCalledWith(['b'])
	})
})

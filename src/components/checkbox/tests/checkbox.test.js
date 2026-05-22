// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../index.js'
import { Fieldset } from '../../fieldset/index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

describe('@ark-ui/plastic Checkbox', ()=> {
	it('toggles via the hidden input and keeps indicator state in sync', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Checkbox.Root, {
			children: [
				h(Checkbox.Label, null, 'Accept terms'),
				h(Checkbox.Control, null, h(Checkbox.Indicator)),
				h(Checkbox.HiddenInput, { name: 'terms' }),
			],
		}))

		const indicator = container.querySelector('[data-part="indicator"]')
		const input = container.querySelector('input[type="checkbox"]')

		await user.click(input)
		expect(indicator.dataset.state).toBe('checked')
		expect(input.checked).toBe(true)
	})

	it('toggles when clicking the control', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Checkbox.Root, {
			children: [
				h(Checkbox.Label, null, 'Accept terms'),
				h(Checkbox.Control, null, h(Checkbox.Indicator)),
				h(Checkbox.HiddenInput, { name: 'terms' }),
			],
		}))

		const control = container.querySelector('[data-part="control"]')
		const input = container.querySelector('input[type="checkbox"]')

		await user.click(control)
		expect(input.checked).toBe(true)
	})

	it('maps checked changes to the legacy callback shape', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const checked = createSignal(false)

		renderApp(container, h(Checkbox.Root, {
			checked,
			onCheckedChange: checked,
			children: [
				h(Checkbox.Control, null, h(Checkbox.Indicator)),
				h(Checkbox.HiddenInput, { name: 'terms' }),
			],
		}))

		const input = ()=> container.querySelector('input[type="checkbox"]')
		await user.click(input())
		expect(checked()).toBe(true)
		expect(input().checked).toBe(true)
	})

	it('unchecks on first click when controlled and initially checked', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const checked = createSignal(true)

		renderApp(container, h(Checkbox.Root, {
			checked,
			onCheckedChange: checked,
			children: [
				h(Checkbox.Control, null, h(Checkbox.Indicator)),
				h(Checkbox.HiddenInput, { name: 'terms' }),
			],
		}))

		const input = ()=> container.querySelector('input[type="checkbox"]')
		expect(input().checked).toBe(true)

		await user.click(input())
		expect(checked()).toBe(false)
		expect(input().checked).toBe(false)
	})

	it('inherits disabled state from Fieldset', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Fieldset.Root, {
			disabled: true,
			children: h(Checkbox.Root, {
				children: [
					h(Checkbox.Control, null, h(Checkbox.Indicator)),
					h(Checkbox.HiddenInput, { name: 'terms' }),
				],
			}),
		}))

		expect(container.querySelector('[data-part="control"]').getAttribute('data-disabled')).toBe('')
		expect(container.querySelector('input[type="checkbox"]').disabled).toBe(true)
	})

	it('does not set aria-hidden on control', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Checkbox.Root, {
			children: [
				h(Checkbox.Control, null, h(Checkbox.Indicator)),
				h(Checkbox.HiddenInput, { name: 'terms' }),
			],
		}))

		const control = container.querySelector('[data-part="control"]')
		expect(control.getAttribute('aria-hidden')).toBeNull()
	})

	it('calls onCheckedChange with true when checking', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onCheckedChange: spy }))

		const input = container.querySelector('input[type="checkbox"]')
		await user.click(input)

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	it('calls onCheckedChange with false when unchecking', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { defaultChecked: true, onCheckedChange: spy }))

		const input = container.querySelector('input[type="checkbox"]')
		await user.click(input)

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(false)
	})

	describe('asChild', ()=> {
		it('renders only the child element — no label wrapper', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Checkbox.Root, { asChild: true }, h('div', null, 'Checkbox')))

			expect(container.querySelector('label')).toBeNull()
			expect(container.querySelector('div')).not.toBeNull()
		})

		it('child receives data-part and data-scope from the part', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Checkbox.Root, { asChild: true }, h('div', null, 'Checkbox')))

			const div = container.querySelector('div')
			expect(div.getAttribute('data-part')).toBe('root')
			expect(div.getAttribute('data-scope')).toBe('checkbox')
		})

		it('merges event handlers — both part click and child onClick fire', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			const childSpy = vi.fn()

			renderApp(container, h(Checkbox.Root, {
				asChild: true,
				children: h('div', { onClick: childSpy }, 'Checkbox'),
			}))

			const div = container.querySelector('div')
			await user.click(div)

			expect(childSpy).toHaveBeenCalledOnce()
		})
	})
})

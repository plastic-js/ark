// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Field, Switch } from '../../../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

// zag-js v1.40 model:
//   <label data-part="root" for="...">         ← interactive surface (native HTML)
//     <span data-part="label">                  ← text label (visible)
//     <span data-part="control" aria-hidden>    ← visual track (decorative)
//       <span data-part="thumb" aria-hidden>    ← visual thumb (decorative)
//     <input type="checkbox">                    ← real interactive element
//
// The control/thumb spans are decorative (aria-hidden). State changes flow
// through the hidden checkbox; the label's for= attribute makes label clicks
// natively forward to it. Tests verify by querying [data-part=...] for visual
// state and clicking the input (or label) for interaction.
describe('@ark-ui/plastic Switch', ()=> {
	it('toggles through the input and reflects state on the control', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [
				h(Switch.Label, null, 'Notifications'),
				h(Switch.Control, null, h(Switch.Thumb)),
				h(Switch.HiddenInput, { name: 'notifications' }),
			],
		}))

		const control = container.querySelector('[data-part="control"]')
		const input = container.querySelector('input[type="checkbox"]')

		expect(control.dataset.state).toBe('unchecked')
		expect(input.checked).toBe(false)

		await user.click(input)
		expect(control.dataset.state).toBe('checked')
		expect(input.checked).toBe(true)

		await user.click(input)
		expect(control.dataset.state).toBe('unchecked')
		expect(input.checked).toBe(false)
	})

	it('clicking the root label forwards to the hidden input', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [
				h(Switch.Control, null, h(Switch.Thumb)),
				h(Switch.HiddenInput),
			],
		}))

		const root = container.querySelector('[data-part="root"]')
		const input = container.querySelector('input[type="checkbox"]')

		expect(input.checked).toBe(false)
		await user.click(root)
		expect(input.checked).toBe(true)
	})

	it('uses the surrounding Field ids for form labeling', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Field.Root, {
			children: [
				h(Field.Label, null, 'Email updates'),
				h(Switch.Root, {
					children: [
						h(Switch.Control),
						h(Switch.HiddenInput),
					],
				}),
			],
		}))

		const label = container.querySelector('label[data-part="label"]')
		const input = container.querySelector('input[type="checkbox"]')

		expect(label.htmlFor).toBe(input.id)
	})

	it('supports controlled checked state with a Plastic signal setter callback', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const checked = createSignal(false)

		renderApp(container, h(Switch.Root, {
			checked,
			onCheckedChange: checked,
			children: [
				h(Switch.Control, null, h(Switch.Thumb)),
				h(Switch.HiddenInput, { name: 'notifications' }),
			],
		}))

		const input = container.querySelector('input[type="checkbox"]')
		const control = container.querySelector('[data-part="control"]')

		await user.click(input)
		expect(checked()).toBe(true)
		expect(control.dataset.state).toBe('checked')
		expect(input.checked).toBe(true)
	})

	it('renders with defaultChecked=true and reports checked state', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			defaultChecked: true,
			children: [
				h(Switch.Control, null, h(Switch.Thumb)),
				h(Switch.HiddenInput),
			],
		}))

		const control = container.querySelector('[data-part="control"]')
		const input = container.querySelector('input[type="checkbox"]')

		expect(control.dataset.state).toBe('checked')
		expect(input.checked).toBe(true)
	})

	it('disabled switch does not toggle on click', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			disabled: true,
			children: [
				h(Switch.Control, null, h(Switch.Thumb)),
				h(Switch.HiddenInput),
			],
		}))

		const input = container.querySelector('input[type="checkbox"]')
		const control = container.querySelector('[data-part="control"]')

		expect(input.checked).toBe(false)
		await user.click(input)
		expect(input.checked).toBe(false)
		expect(control.dataset.state).toBe('unchecked')
	})

	it('disabled switch has disabled attribute on hidden input', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			disabled: true,
			children: [h(Switch.HiddenInput)],
		}))

		const input = container.querySelector('input[type="checkbox"]')
		expect(input.disabled).toBe(true)
	})

	it('disabled switch has data-disabled on control', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			disabled: true,
			children: [h(Switch.Control)],
		}))

		const control = container.querySelector('[data-part="control"]')
		expect(control.dataset.disabled).toBeDefined()
	})

	it('hidden input does not set aria-hidden', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.HiddenInput)],
		}))

		const input = container.querySelector('input[type="checkbox"]')
		expect(input.getAttribute('aria-hidden')).toBeNull()
	})

	it('label has data-part="label"', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.Label, null, 'My label')],
		}))

		expect(container.querySelector('[data-part="label"]')).not.toBeNull()
	})

	it('thumb has data-part="thumb"', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.Control, null, h(Switch.Thumb))],
		}))

		expect(container.querySelector('[data-part="thumb"]')).not.toBeNull()
	})

	it('control has data-part="control"', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.Control)],
		}))

		expect(container.querySelector('[data-part="control"]')).not.toBeNull()
	})

	it('control is decorative (aria-hidden)', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.Control)],
		}))

		const control = container.querySelector('[data-part="control"]')
		expect(control.getAttribute('aria-hidden')).toBe('true')
	})

	it('thumb data-state starts as unchecked', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.Control, null, h(Switch.Thumb))],
		}))

		const thumb = container.querySelector('[data-part="thumb"]')
		expect(thumb.dataset.state).toBe('unchecked')
	})

	it('thumb data-state starts as checked when defaultChecked=true', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			defaultChecked: true,
			children: [h(Switch.Control, null, h(Switch.Thumb))],
		}))

		const thumb = container.querySelector('[data-part="thumb"]')
		expect(thumb.dataset.state).toBe('checked')
	})

	it('invalid switch has data-invalid on the root', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			invalid: true,
			children: [h(Switch.Control)],
		}))

		const root = container.querySelector('[data-part="root"]')
		expect(root.dataset.invalid).toBeDefined()
	})

	it('invalid switch has data-invalid on the control', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			invalid: true,
			children: [h(Switch.Control)],
		}))

		const control = container.querySelector('[data-part="control"]')
		expect(control.dataset.invalid).toBeDefined()
	})

	it('inherits disabled from surrounding Field', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Field.Root, {
			disabled: true,
			children: h(Switch.Root, {
				children: [
					h(Switch.Control),
					h(Switch.HiddenInput),
				],
			}),
		}))

		const control = container.querySelector('[data-part="control"]')
		const input = container.querySelector('input[type="checkbox"]')

		expect(input.disabled).toBe(true)
		expect(control.dataset.disabled).toBeDefined()
	})

	it('custom class is forwarded to Switch.Control', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.Control, { class: 'my-control' })],
		}))

		expect(container.querySelector('.my-control')).not.toBeNull()
	})

	it('custom class is forwarded to Switch.Label', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.Label, { class: 'my-label' }, 'Toggle')],
		}))

		expect(container.querySelector('.my-label')).not.toBeNull()
	})

	it('toggling twice returns to unchecked state', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [
				h(Switch.Control),
				h(Switch.HiddenInput),
			],
		}))

		const input = container.querySelector('input[type="checkbox"]')
		const control = container.querySelector('[data-part="control"]')

		await user.click(input)
		await user.click(input)

		expect(control.dataset.state).toBe('unchecked')
		expect(input.checked).toBe(false)
	})

	it('controlled signal stays false when switch is disabled', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const checked = createSignal(false)

		renderApp(container, h(Switch.Root, {
			disabled: true,
			checked,
			onCheckedChange: checked,
			children: [
				h(Switch.Control),
				h(Switch.HiddenInput),
			],
		}))

		const input = container.querySelector('input[type="checkbox"]')
		await user.click(input)
		expect(checked()).toBe(false)
	})

	it('hidden input tabIndex is -1', ()=> {
		const container = document.createElement('div')

		renderApp(container, h(Switch.Root, {
			children: [h(Switch.HiddenInput)],
		}))

		const input = container.querySelector('input[type="checkbox"]')
		expect(input.tabIndex).toBe(-1)
	})

	it('calls onCheckedChange with true when switching on', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onCheckedChange: spy }))

		await user.click(container.querySelector('input[type="checkbox"]'))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(true)
	})

	it('calls onCheckedChange with false when switching off', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { defaultChecked: true, onCheckedChange: spy }))

		await user.click(container.querySelector('input[type="checkbox"]'))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe(false)
	})
})

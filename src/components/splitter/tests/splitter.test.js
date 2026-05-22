// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Splitter } from '../index.js'
import {
	createSignal,
	h,
	renderApp,
} from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Splitter', ()=> {
	it('updates the splitter value with keyboard input', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Splitter.Root, {
			defaultValue: 40,
			children: [
				h(Splitter.Panel, null, 'Start'),
				h(Splitter.ResizeTrigger, { tabIndex: 0 }),
				h(Splitter.Panel, null, 'End'),
			],
		}))

		const root = container.querySelector('[data-part="root"]')
		const trigger = container.querySelector('[data-part="resize-trigger"]')

		trigger.focus()
		await user.keyboard('[ArrowRight]')
		expect(root.dataset.value).toBe('45')
	})

	it('supports controlled values and exposes separator semantics', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal(40)
		const onValueChange = vi.fn()

		renderApp(container, h(Splitter.Root, {
			value,
			onValueChange,
			min: 30,
			max: 70,
			children: [
				h(Splitter.Panel, null, 'Start'),
				h(Splitter.ResizeTrigger),
				h(Splitter.Panel, null, 'End'),
			],
		}))

		const root = container.querySelector('[data-part="root"]')
		const trigger = container.querySelector('[data-part="resize-trigger"]')
		const panels = container.querySelectorAll('[data-part="panel"]')

		expect(trigger.getAttribute('role')).toBe('separator')
		expect(trigger.getAttribute('aria-orientation')).toBe('vertical')
		expect(trigger.getAttribute('aria-valuenow')).toBe('40')
		expect(trigger.getAttribute('aria-controls')).toContain(panels[0].id)

		trigger.focus()
		// horizontal splitter responds to ArrowRight; zag drives the move via the machine's onResize
		await user.keyboard('[ArrowRight]')
		expect(onValueChange).toHaveBeenCalledWith(45)

		value(55)
		expect(root.dataset.value).toBe('55')
		expect(trigger.getAttribute('aria-valuenow')).toBe('55')
		expect(panels[0].style.flex).toContain('55%')
	})
})

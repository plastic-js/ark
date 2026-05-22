// @vitest-environment jsdom

import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Tour } from '../index.js'
import {
	h,
	renderApp,
} from '../../../runtime.js'

beforeEach(()=> {
	Element.prototype.getBoundingClientRect = vi.fn(()=> ({
		x: 0,
		y: 0,
		width: 100,
		height: 100,
		top: 0,
		left: 0,
		right: 100,
		bottom: 100,
	}))
	Object.defineProperty(window, 'visualViewport', {
		writable: true,
		configurable: true,
		value: {
			width: 1024,
			height: 768,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		},
	})
})

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Tour', ()=> {
	it('renders tour structure', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Tour.Root, {
			steps: [
				{
					id: 'first', type: 'dialog', title: 'First', description: 'Intro',
				},
			],
			children: [
				h(Tour.Trigger, null, 'Start'),
				h(Tour.Backdrop),
				h(Tour.Positioner, null, h(Tour.Content, null, [
					h(Tour.Title),
					h(Tour.Description),
					h(Tour.CloseTrigger, null, 'Close'),
				])),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		expect(trigger).toBeTruthy()
	})

	it('next trigger advances the step', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		const steps = [
			{
				id: 'welcome', type: 'dialog', title: 'Welcome', description: 'Intro',
			},
			{
				id: 'inspect', type: 'dialog', title: 'Inspect', description: 'Step 2',
			},
			{
				id: 'done', type: 'dialog', title: 'Done', description: 'Step 3',
			},
		]

		const stepChanges = []
		renderApp(container, h(Tour.Root, {
			steps,
			onStepChange: idx=> stepChanges.push(idx),
			children: [
				h(Tour.Trigger, null, 'Start'),
				h(Tour.Positioner, null, h(Tour.Content, null, [
					h(Tour.PrevTrigger, null, 'Prev'),
					h(Tour.NextTrigger, null, 'Next'),
					h(Tour.CloseTrigger, null, 'Close'),
				])),
			],
		}))

		await user.click(container.querySelector('[data-part="trigger"]'))

		const prevBtn = container.querySelector('[data-type="prev"]')
		const nextBtn = container.querySelector('[data-type="next"]')
		expect(prevBtn?.disabled).toBe(true)
		expect(nextBtn?.disabled).toBe(false)

		await user.click(nextBtn)

		expect(stepChanges.length).toBeGreaterThan(0)
		expect(stepChanges[stepChanges.length - 1]).toBe(1)
		expect(prevBtn?.disabled).toBe(false)
	})

	it('renders title and description for the active step', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		const steps = [
			{
				id: 'welcome', type: 'dialog', title: 'Welcome', description: 'Intro copy',
			},
			{
				id: 'inspect', type: 'dialog', title: 'Inspect', description: 'Step 2 copy',
			},
		]

		renderApp(container, h(Tour.Root, {
			steps,
			children: [
				h(Tour.Trigger, null, 'Start'),
				h(Tour.Positioner, null, h(Tour.Content, null, [
					h(Tour.Title),
					h(Tour.Description),
					h(Tour.NextTrigger, null, 'Next'),
				])),
			],
		}))

		await user.click(container.querySelector('[data-part="trigger"]'))

		const title = container.querySelector('[data-part="title"]')
		const description = container.querySelector('[data-part="description"]')
		const nextBtn = container.querySelector('[data-type="next"]')

		expect(title?.textContent).toBe('Welcome')
		expect(description?.textContent).toBe('Intro copy')

		await user.click(nextBtn)

		expect(title?.textContent).toBe('Inspect')
		expect(description?.textContent).toBe('Step 2 copy')
	})
})

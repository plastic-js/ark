// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { DateInput, useDateInputContext } from '../index.js'
import {
	createSignal,
	h,
	renderApp,
} from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

const DateInputSegments = ()=> {
	const dateInput = useDateInputContext()
	return ()=> dateInput().getSegments().map((segment, index)=> h(DateInput.Segment, { segment, key: index }))
}

const DateInputField = ()=> [
	h(DateInput.HiddenInput),
	h(DateInput.Control, null, h(DateInput.SegmentGroup, null, h(DateInputSegments))),
]

describe('@ark-ui/plastic DateInput', ()=> {
	it('renders a date input with formatted value', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DateInput.Root, {
			defaultValue: '2026-05-02',
			children: h(DateInputField),
		}))

		const input = container.querySelector('input[type="hidden"]')
		const control = container.querySelector('[data-scope="date-input"][data-part="control"]')
		expect(input.value.length).toBeGreaterThan(0)
		expect(control).not.toBeNull()
		expect(control.textContent).toBe('05/02/2026')
	})

	it('supports controlled value updates', ()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('2026-05-02')
		const onValueChange = vi.fn()

		renderApp(container, h(DateInput.Root, {
			value,
			onValueChange,
			children: h(DateInputField),
		}))

		const input = container.querySelector('input[type="hidden"]')
		const control = container.querySelector('[data-scope="date-input"][data-part="control"]')
		expect(input.value.length).toBeGreaterThan(0)
		expect(control.textContent).toBe('05/02/2026')

		value('2026-05-20')
		expect(input.value.length).toBeGreaterThan(0)
		expect(control.textContent).toBe('05/20/2026')
	})

	it('renders individual segment and segment-group parts', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DateInput.Root, {
			defaultValue: '2026-05-02',
			children: h(DateInputField),
		}))

		const segmentGroup = container.querySelector('[data-part="segment-group"]')
		const segments = container.querySelectorAll('[data-part="segment"]')
		expect(segmentGroup).not.toBeNull()
		expect(segments.length).toBeGreaterThan(0)
	})

	it('focuses editable segments on click', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DateInput.Root, {
			defaultValue: '2026-05-02',
			children: h(DateInputField),
		}))

		const firstEditableSegment = container.querySelector('[data-part="segment"][data-editable]')
		expect(firstEditableSegment).not.toBeNull()

		await user.click(firstEditableSegment)
		expect(document.activeElement).toBe(firstEditableSegment)
	})

	it('keeps segments focusable after typing into one segment', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DateInput.Root, {
			defaultValue: '2026-05-02',
			children: h(DateInputField),
		}))

		const editableSegments = ()=> [...container.querySelectorAll('[data-part="segment"][data-editable]')]
		const [monthSegment, daySegment] = editableSegments()
		expect(monthSegment).not.toBeNull()
		expect(daySegment).not.toBeNull()

		await user.click(monthSegment)
		expect(document.activeElement).toBe(monthSegment)

		await user.keyboard('1')

		const nextDaySegment = editableSegments()[1]
		await user.click(nextDaySegment)
		expect(document.activeElement).toBe(nextDaySegment)
	})

	it('allows entering multiple digits within a segment before advancing', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DateInput.Root, {
			defaultValue: '2026-05-02',
			children: h(DateInputField),
		}))

		const editableSegments = ()=> [...container.querySelectorAll('[data-part="segment"][data-editable]')]
		const [monthSegment, daySegment] = editableSegments()
		expect(monthSegment).not.toBeNull()
		expect(daySegment).not.toBeNull()

		await user.click(monthSegment)
		expect(document.activeElement).toBe(monthSegment)

		await user.keyboard('12')

		const [nextMonthSegment, nextDaySegment] = editableSegments()
		expect(nextMonthSegment.textContent).toBe('12')
		expect(nextDaySegment.textContent).toBe('02')
	})

	it('keeps controlled segment editing active across multiple digits', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('2026-05-02')

		renderApp(container, h(DateInput.Root, {
			value,
			onValueChange: value,
			children: h(DateInputField),
		}))

		const editableSegments = ()=> [...container.querySelectorAll('[data-part="segment"][data-editable]')]
		const [monthSegment] = editableSegments()

		await user.click(monthSegment)
		await user.keyboard('12')

		const [nextMonthSegment, nextDaySegment] = editableSegments()
		expect(nextMonthSegment.textContent).toBe('12')
		expect(nextDaySegment.textContent).toBe('02')
	})

	it('renders label with correct association', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DateInput.Root, {
			defaultValue: '2026-05-02',
			children: [
				h(DateInput.Label, { children: 'Date' }),
				h(DateInputField),
			],
		}))

		const label = container.querySelector('[data-part="label"]')
		expect(label).not.toBeNull()
		expect(label.textContent).toBe('Date')
	})
})


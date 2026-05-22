// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import {
	DatePicker,
	DatePickerProvider,
	useDatePickerContext,
} from '../index.js'
import {
	createSignal,
	h,
	renderApp,
} from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic DatePicker', ()=> {
	it('opens date picker content from the trigger', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DatePicker.Root, {
			children: [
				h(DatePicker.Trigger, null, 'Pick date'),
				h(DatePicker.Content, null, [
					h(DatePicker.Input),
					h(DatePicker.CloseTrigger, null, 'Close'),
				]),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const content = container.querySelector('[data-part="content"]')

		expect(content.hidden).toBe(true)
		await user.click(trigger)
		expect(content.hidden).toBe(false)
	})

	it('supports controlled open/value state', ()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const open = createSignal(true)
		const value = createSignal('2026-05-02')
		const onOpenChange = vi.fn()

		renderApp(container, h(DatePicker.Root, {
			open,
			value,
			onOpenChange,
			children: [
				h(DatePicker.Trigger, null, 'Pick date'),
				h(DatePicker.Content, null, [
					h(DatePicker.Input),
					h(DatePicker.CloseTrigger, null, 'Close'),
				]),
			],
		}))

		const content = container.querySelector('[data-part="content"]')
		const input = container.querySelector('[data-part="input"]')

		expect(content.hidden).toBe(false)
		expect(input.value).toBe('05/02/2026')

		open(false)
		expect(content.hidden).toBe(true)
		expect(input.value).toBe('05/02/2026')
	})

	it('keeps the selected date visible in the input while opening and closing', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(DatePicker.Root, {
			defaultValue: '2026-05-02',
			children: [
				h(DatePicker.Input),
				h(DatePicker.Trigger, null, 'Pick date'),
				h(DatePicker.Content, null, 'Panel'),
			],
		}))

		const input = container.querySelector('[data-part="input"]')
		const trigger = container.querySelector('[data-part="trigger"]')

		expect(input.value).toBe('05/02/2026')
		await user.click(trigger)
		expect(input.value).toBe('05/02/2026')
		await user.click(trigger)
		expect(input.value).toBe('05/02/2026')
	})

	it('selects a date from the calendar grid', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const onValueChange = vi.fn()

		const Calendar = ()=> {
			const api = useDatePickerContext()
			return h(DatePicker.Positioner, null, h(DatePicker.Content, null, [
				h(DatePicker.Table, null, [
					h(DatePicker.TableBody, null, ()=> api().weeks.map(week=> h(DatePicker.TableRow, null, week.map(dateValue=> h(DatePicker.Cell, {
						value: dateValue,
						visibleRange: api().visibleRange,
					}, h(DatePicker.CellTrigger, {
						value: dateValue,
						visibleRange: api().visibleRange,
					}, String(dateValue.day))))))),
				]),
			]))
		}

		renderApp(container, h(DatePicker.Root, {
			defaultOpen: true,
			onValueChange,
			children: [
				h(DatePicker.Input),
				h(Calendar),
			],
		}))

		const buttons = [...container.querySelectorAll('[data-part="table-cell-trigger"]')]
		const target = buttons.find(button=> button.getAttribute('data-disabled') == null && button.getAttribute('data-outside-range') == null)

		expect(target).toBeTruthy()
		await user.click(target)
		expect(onValueChange).toHaveBeenCalled()
	})

	it('updates the input display after selecting a new date in controlled mode', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('2026-05-02')

		const Calendar = ()=> {
			const api = useDatePickerContext()
			return h(DatePicker.Positioner, null, h(DatePicker.Content, null, [
				h(DatePicker.Table, null, [
					h(DatePicker.TableBody, null, ()=> api().weeks.map(week=> h(DatePicker.TableRow, null, week.map(dateValue=> h(DatePicker.Cell, {
						value: dateValue,
						visibleRange: api().visibleRange,
					}, h(DatePicker.CellTrigger, {
						value: dateValue,
						visibleRange: api().visibleRange,
					}, String(dateValue.day))))))),
				]),
			]))
		}

		renderApp(container, h(DatePicker.Root, {
			open: true,
			value,
			onValueChange: value,
			children: [
				h(DatePicker.Input),
				h(Calendar),
			],
		}))

		const input = container.querySelector('[data-part="input"]')
		const buttons = [...container.querySelectorAll('[data-part="table-cell-trigger"]')]
		const target = buttons.find(button=> button.getAttribute('data-disabled') == null && button.getAttribute('data-outside-range') == null && button.textContent !== '2')

		expect(input.value).toBe('05/02/2026')
		expect(target).toBeTruthy()
		await user.click(target)
		expect(value()).not.toBe('2026-05-02')
		expect(input.value).toBe(value())
	})

	it('computes cell prop bags once per render pass', ()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const getDayTableCellProps = vi.fn(()=> ({
			'data-part': 'table-cell',
			'data-scope': 'date-picker',
			id: 'cell-1',
		}))
		const getDayTableCellTriggerProps = vi.fn(()=> ({
			'aria-label': 'Choose day 1',
			'data-part': 'table-cell-trigger',
			'data-scope': 'date-picker',
			id: 'trigger-1',
		}))

		renderApp(container, h(DatePickerProvider, {
			value: ()=> ({
				getDayTableCellProps,
				getDayTableCellTriggerProps,
			}),
			children: ()=> h('table', null, h('tbody', null, h('tr', null, h(DatePicker.Cell, { value: '2026-05-01', visibleRange: {} }, h(DatePicker.CellTrigger, { value: '2026-05-01', visibleRange: {} }, '1'))))),
		}))

		expect(getDayTableCellProps).toHaveBeenCalledTimes(1)
		expect(getDayTableCellTriggerProps).toHaveBeenCalledTimes(1)
		expect(container.querySelector('[data-part="table-cell-trigger"]').textContent).toBe('1')
	})

	it('renders day, month, and year calendar views', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		const Calendar = ()=> {
			const api = useDatePickerContext()
			return h(DatePicker.Positioner, null, ()=> h(DatePicker.Content, null, [
				h('div', null, [
					h('button', { type: 'button', onClick: ()=> api().setView('day') }, 'Show days'),
					h('button', { type: 'button', onClick: ()=> api().setView('month') }, 'Show months'),
					h('button', { type: 'button', onClick: ()=> api().setView('year') }, 'Show years'),
				]),
				h(DatePicker.View, { view: api().view }, [
					h(DatePicker.ViewControl, null, [
						h(DatePicker.PrevTrigger, { view: api().view }, 'Prev'),
						h(DatePicker.ViewTrigger, null, h(DatePicker.RangeText)),
						h(DatePicker.NextTrigger, { view: api().view }, 'Next'),
					]),
					h(DatePicker.Table, { view: api().view, columns: api().view === 'day' ? 7 : 4 }, [
						()=> api().view === 'day' ? h(DatePicker.TableHead, { view: 'day' }, h(DatePicker.TableRow, null, api().weekDays.map(weekDay=> h(DatePicker.TableHeader, null, weekDay.narrow)))) : null,
						h(DatePicker.TableBody, { view: api().view, columns: api().view === 'day' ? 7 : 4 }, ()=> {
							if (api().view === 'month'){
								return api().getMonthsGrid({ columns: 4, format: 'short' }).map(months=> h(DatePicker.TableRow, { view: 'month', columns: 4 }, months.map(month=> h(DatePicker.Cell, {
									value: month.value, view: 'month', columns: 4,
								}, h(DatePicker.CellTrigger, { value: month.value, view: 'month' }, month.label)))))
							}

							if (api().view === 'year'){
								return api().getYearsGrid({ columns: 4 }).map(years=> h(DatePicker.TableRow, { view: 'year', columns: 4 }, years.map(year=> h(DatePicker.Cell, {
									value: year.value, view: 'year', columns: 4,
								}, h(DatePicker.CellTrigger, { value: year.value, view: 'year' }, year.label)))))
							}

							return api().weeks.map(week=> h(DatePicker.TableRow, null, week.map(dateValue=> h(DatePicker.Cell, {
								value: dateValue,
								visibleRange: api().visibleRange,
								view: 'day',
							}, h(DatePicker.CellTrigger, {
								value: dateValue,
								visibleRange: api().visibleRange,
								view: 'day',
							}, String(dateValue.day))))))
						}),
					]),
				]),
			]))
		}

		renderApp(container, h(DatePicker.Root, {
			defaultOpen: true,
			defaultValue: '2026-05-02',
			children: [
				h(DatePicker.Input),
				h(Calendar),
			],
		}))

		const table = ()=> container.querySelector('[data-part="table"]')
		const rangeText = ()=> container.querySelector('[data-part="range-text"]')
		const monthToggle = ()=> [...container.querySelectorAll('button')].find(button=> button.textContent === 'Show months')
		const yearToggle = ()=> [...container.querySelectorAll('button')].find(button=> button.textContent === 'Show years')

		expect(table().getAttribute('data-view')).toBe('day')
		expect(rangeText().textContent).toBe('May 2026')

		// Use dispatchEvent instead of user.click to avoid a flaky race condition
		// between user-event's internal setTimeout(0) macrotask boundaries and
		// alien-signals' batched effect flushing in jsdom. dispatchEvent fires
		// the click handler synchronously, ensuring the reactive DOM update
		// completes before the next assertion.
		monthToggle().dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
		expect(table().getAttribute('data-view')).toBe('month')
		expect(rangeText().textContent).toBe('2026')
		expect(container.querySelector('[data-part="table-cell-trigger"]').textContent).toBe('Jan')

		yearToggle().dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
		expect(table().getAttribute('data-view')).toBe('year')
		expect(rangeText().textContent).toMatch(/2020\s*[-–—]\s*2029/)
		expect(container.textContent).toContain('2026')
	})
})

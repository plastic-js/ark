import {
	createComputed,
	createSignal,
} from '../../../runtime.js'
import { DatePicker, useDatePickerContext } from '../../../index.js'

const MONTH_COLUMNS = 4
const YEAR_COLUMNS = 4

const DatePickerCalendar = ()=> {
	const datePicker = useDatePickerContext()
	// Cache showcase reads locally, but pass plain values into DatePicker parts:
	// these subcomponents expect view keys like "day"/"month"/"year", not
	// accessors, and some internals branch on the value synchronously.
	const view = createComputed(()=> datePicker().view)
	const tableColumns = createComputed(()=> view() === 'day' ? 7 : MONTH_COLUMNS)
	const weekDays = createComputed(()=> datePicker().weekDays)
	const stableCalendarData = createComputed(()=> datePicker().stableCalendarData)

	const renderDayView = ()=> {
		const { weeks, visibleRange } = stableCalendarData()
		return weeks.map(week=> (
			<DatePicker.TableRow>
				{week.map(dateValue=> (
					<DatePicker.Cell value={dateValue} visibleRange={visibleRange} view='day'>
						<DatePicker.CellTrigger value={dateValue} visibleRange={visibleRange} view='day'>
							{dateValue.day}
						</DatePicker.CellTrigger>
					</DatePicker.Cell>
				))}
			</DatePicker.TableRow>
		))
	}

	const renderMonthView = ()=> {
		const api = datePicker()
		return api.getMonthsGrid({ columns: MONTH_COLUMNS, format: 'short' }).map(months=> (
		<DatePicker.TableRow view='month' columns={MONTH_COLUMNS}>
			{months.map(month=> (
				<DatePicker.Cell value={month.value} view='month' columns={MONTH_COLUMNS}>
					<DatePicker.CellTrigger value={month.value} view='month'>
						{month.label}
					</DatePicker.CellTrigger>
				</DatePicker.Cell>
			))}
		</DatePicker.TableRow>
		))
	}

	const renderYearView = ()=> {
		const api = datePicker()
		return api.getYearsGrid({ columns: YEAR_COLUMNS }).map(years=> (
		<DatePicker.TableRow view='year' columns={YEAR_COLUMNS}>
			{years.map(year=> (
				<DatePicker.Cell value={year.value} view='year' columns={YEAR_COLUMNS}>
					<DatePicker.CellTrigger value={year.value} view='year'>
						{year.label}
					</DatePicker.CellTrigger>
				</DatePicker.Cell>
			))}
		</DatePicker.TableRow>
		))
	}

	return (
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.View view={view()}>
					<DatePicker.ViewControl>
						<DatePicker.PrevTrigger view={view()}>{'‹'}</DatePicker.PrevTrigger>
						<DatePicker.ViewTrigger>
							<DatePicker.RangeText />
						</DatePicker.ViewTrigger>
						<DatePicker.NextTrigger view={view()}>{'›'}</DatePicker.NextTrigger>
					</DatePicker.ViewControl>
					<DatePicker.Table view={view()} columns={tableColumns()}>
						{()=> view() === 'day' ? (
							<DatePicker.TableHead view='day'>
							<DatePicker.TableRow>
								{()=> weekDays().map(weekDay=> (
									<DatePicker.TableHeader>{weekDay.narrow}</DatePicker.TableHeader>
								))}
							</DatePicker.TableRow>
							</DatePicker.TableHead>
						) : null}
						<DatePicker.TableBody view={view()} columns={tableColumns()}>
							{()=> {
								switch (view()){
									case 'month':
										return renderMonthView()
									case 'year':
										return renderYearView()
									default:
										return renderDayView()
								}
							}}
						</DatePicker.TableBody>
					</DatePicker.Table>
					<div className='button-row' style={{ 'margin-top': '8px' }}>
						<DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
					</div>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	)
}

const DatePickerShowcase = ()=> {
	const open = createSignal(false)
	const value = createSignal('2026-05-02')

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>DatePicker</h1>
				<p className='hero-copy'>Live, component-specific demo for DatePicker.</p>
			</header>
			<section className='feature-card'>
				<DatePicker.Root onOpenChange={open} onValueChange={value} open={open} value={value}>
					<DatePicker.Label>Date</DatePicker.Label>
					<DatePicker.Control className='button-row'>
						<DatePicker.Input />
						<DatePicker.Trigger>Pick date</DatePicker.Trigger>
					</DatePicker.Control>
					<div className='checklist'>
						<p>{()=> open() ? 'State: open' : 'State: closed'}</p>
						<p>{()=> `Selected date: ${value() || 'none'}`}</p>
						<p>Open the panel to move between months, select a date from the calendar grid, or clear the current value.</p>
					</div>
					<DatePickerCalendar />
				</DatePicker.Root>
				<code className='anatomy'>{`<DatePicker.Root>
  <DatePicker.Label />
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.Trigger />
  </DatePicker.Control>
  <DatePicker.Positioner>
    <DatePicker.Content>
      <DatePicker.View>
        <DatePicker.ViewControl>
          <DatePicker.PrevTrigger />
          <DatePicker.ViewTrigger>
            <DatePicker.RangeText />
          </DatePicker.ViewTrigger>
          <DatePicker.NextTrigger />
        </DatePicker.ViewControl>
        <DatePicker.Table>
          <DatePicker.TableHead>
            <DatePicker.TableRow>
              <DatePicker.TableHeader />
            </DatePicker.TableRow>
          </DatePicker.TableHead>
          <DatePicker.TableBody>
            <DatePicker.TableRow>
              <DatePicker.Cell>
                <DatePicker.CellTrigger />
              </DatePicker.Cell>
            </DatePicker.TableRow>
          </DatePicker.TableBody>
        </DatePicker.Table>
        <DatePicker.ClearTrigger />
      </DatePicker.View>
    </DatePicker.Content>
  </DatePicker.Positioner>
</DatePicker.Root>`}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default DatePickerShowcase

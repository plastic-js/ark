import * as datePicker from '@zag-js/date-picker'
import { normalizeProps, useMachine } from '@plastic-js/zag'
import { createComputed, createEffect, createSignal } from '../../runtime.js'
import { createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

const getSingleValue = value=> Array.isArray(value) ? value[0] : value

const hasDateValue = value=> value != null && value !== ''

const normalizeDateValue = (value)=> {
	if (typeof value !== 'string'){
		return value
	}

	if ((/^\d{2}\/\d{2}\/\d{4}$/).test(value)){
		const [month, day, year] = value.split('/')
		return `${year}-${month}-${day}`
	}

	return value
}

const formatDisplayValue = (api, value)=> {
	if (value == null || value === ''){
		return ''
	}

	if (typeof value === 'string' && value.includes('/')){
		return value
	}

	const parsedValue = datePicker.parse(normalizeDateValue(value))
	return parsedValue? api.format(parsedValue, {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
		}): value
}

export const useDatePicker = (props = {})=> {
	const id = createUniqueId('date-picker')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const displayValue = createSignal('')
	const resolvedPositioning = access(props.positioning)
	const service = useMachine(datePicker.machine, ()=> {
		const controlledValue = getSingleValue(access(props.value))
		const defaultValue = getSingleValue(access(props.defaultValue))

		return {
			id,
			dir: locale.dir,
			getRootNode: environment.getRootNode,
			...props,
			positioning: resolvedPositioning,
			open: access(props.open),
			defaultOpen: access(props.defaultOpen),
			value: hasDateValue(controlledValue) ? [datePicker.parse(normalizeDateValue(controlledValue))] : undefined,
			defaultValue: hasDateValue(defaultValue) ? [datePicker.parse(normalizeDateValue(defaultValue))] : undefined,
			disabled: access(props.disabled),
			onOpenChange: details=> props.onOpenChange?.(details.open),
			onValueChange: (details)=> {
				const nextValue = details.valueAsString?.[0] ?? ''
				displayValue(nextValue)
				props.onValueChange?.(nextValue)
			},
		}
	})
	const apiComputed = createComputed(()=> datePicker.connect(service, normalizeProps))

	createEffect(()=> {
		const controlledValue = getSingleValue(access(props.value))
		if (hasDateValue(controlledValue)){
			displayValue(formatDisplayValue(apiComputed(), controlledValue))
			return
		}

		if (controlledValue === ''){
			displayValue('')
			return
		}

		const defaultValue = getSingleValue(access(props.defaultValue))
		if (hasDateValue(defaultValue) && displayValue() === ''){
			displayValue(formatDisplayValue(apiComputed(), defaultValue))
		}
	})

	// Calendar data (weeks + visibleRange) only changes on month/view navigation,
	// not on date selection. Memoize by visibleRangeText so the calendar grid
	// thunk doesn't rebuild 42 cells every time the selected value changes.
	let prevVisibleRangeText = null
	let cachedCalendarData = null
	const stableCalendarData = createComputed(()=> {
		const api = apiComputed()
		const text = api.visibleRangeText
		if (text !== prevVisibleRangeText){
			prevVisibleRangeText = text
			cachedCalendarData = { weeks: api.weeks, visibleRange: api.visibleRange }
		}
		return cachedCalendarData
	})

	// Return a stable proxy — same object reference on every call — so reactive
	// thunks that read datePicker() don't subscribe to apiComputed directly.
	// Subscriptions happen per-property at access time, which lets calendar-grid
	// thunks (weeks) and nav-text thunks track only what they actually need.
	const stableProxy = new Proxy({}, {
		get(_, key){
			if (key === 'stableCalendarData'){ return stableCalendarData() }
			if (key === 'getDisplayValue'){ return displayValue }
			if (key === 'getTableHeadProps'){ return (p = {})=> apiComputed().getTableHeaderProps(p) }
			return apiComputed()[key]
		},
		has(_, key){
			return key === 'stableCalendarData' || key === 'getDisplayValue' || key === 'getTableHeadProps' || key in apiComputed()
		},
	})

	return ()=> stableProxy
}

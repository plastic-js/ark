import * as slider from '@zag-js/slider'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const splitSliderProps = createSplitProps([
	...slider.props,
	'getValueText',
	'rootRef',
	'asChild',
	'children',
])

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useSlider = (props = {})=> {
	const [machineProps, elementProps] = splitSliderProps(props)
	const id = createUniqueId('slider')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const isRange = Array.isArray(access(machineProps.value)) || Array.isArray(access(machineProps.defaultValue))
	const service = useMachine(slider.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		value: access(machineProps.value) != null ? Array.isArray(access(machineProps.value)) ? access(machineProps.value) : [access(machineProps.value)] : undefined,
		defaultValue: access(machineProps.defaultValue) != null ? Array.isArray(access(machineProps.defaultValue)) ? access(machineProps.defaultValue) : [access(machineProps.defaultValue)] : undefined,
		onValueChange: details=> machineProps.onValueChange?.(isRange ? details.value : details.value[0]),
		getAriaValueText: machineProps.getAriaValueText ?? (machineProps.getValueText ? ({ value })=> machineProps.getValueText(value) : undefined),
	}))
	const getApi = ()=> slider.connect(service, normalizeProps)
	const getDisplayValue = ()=> {
		const api = getApi()
		const value = isRange ? api.value : api.value[0]
		return machineProps.getValueText?.(value) ?? (Array.isArray(value) ? value.join(', ') : String(value ?? ''))
	}
	const resolveThumbProps = (props = {})=> {
		const index = props.index ?? Number(props['data-index'] ?? 0)
		return {
			index,
			name: props.name,
		}
	}
	const getPointerValue = (event)=> {
		const trackNode = event.currentTarget?.getBoundingClientRect ? event.currentTarget : environment.getDocument()?.getElementById(getApi().getTrackProps().id)
		if (!trackNode){
			return null
		}

		const rect = trackNode.getBoundingClientRect()
		const orientation = access(machineProps.orientation) ?? 'horizontal'
		let percent = (event.clientX - rect.left) * 100 / rect.width
		if (orientation === 'vertical'){
			percent = (rect.bottom - event.clientY) * 100 / rect.height
		}

		const min = Number(access(machineProps.min) ?? 0)
		const max = Number(access(machineProps.max) ?? 100)
		const step = Math.abs(Number(access(machineProps.step) ?? 1)) || 1
		const boundedPercent = Math.max(0, Math.min(100, percent))
		const valueDelta = boundedPercent / 100 * (max - min)
		const rawValue = min + valueDelta
		const stepOffset = Math.round((rawValue - min) / step) * step
		const snappedValue = stepOffset + min
		return Math.min(max, Math.max(min, snappedValue))
	}
	const getClosestThumbIndex = (value)=> {
		const values = getApi().value
		return values.reduce((closestIndex, currentValue, index)=> {
			const closestDistance = Math.abs(values[closestIndex] - value)
			const currentDistance = Math.abs(currentValue - value)
			return currentDistance < closestDistance ? index : closestIndex
		}, 0)
	}

	return createComputed(()=> {
		const api = slider.connect(service, normalizeProps)
		return {
			...api,
			getRootProps: ()=> mergeProps(api.getRootProps(), elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				children: machineProps.children,
			}),
			getValueTextProps: ()=> mergeProps(api.getValueTextProps(), {
				textContent: getDisplayValue,
			}),
			getTrackProps: ()=> mergeProps(api.getTrackProps(), {
				onPointerDown: api.getControlProps().onPointerDown,
			}, {
				onPointerDown: (event)=> {
					if (access(machineProps.disabled) || !(event.button === 0 || event.button == null)){
						return
					}

					const nextValue = getPointerValue(event)
					if (nextValue == null){
						return
					}

					const nextValues = [...api.value]
					nextValues[getClosestThumbIndex(nextValue)] = nextValue
					api.setValue(nextValues)
				},
			}),
			getThumbProps: (props = {})=> {
				const thumbProps = resolveThumbProps(props)
				return mergeProps(api.getThumbProps(thumbProps), {
					onKeyDown: (event)=> {
						if (event.defaultPrevented){
							return
						}

						if (event.key === 'ArrowRight' || event.key === 'ArrowUp'){
							event.preventDefault()
							api.increment(thumbProps.index ?? 0)
						}

						if (event.key === 'ArrowLeft' || event.key === 'ArrowDown'){
							event.preventDefault()
							api.decrement(thumbProps.index ?? 0)
						}

						if (event.key === 'Home'){
							event.preventDefault()
							api.setThumbValue(thumbProps.index ?? 0, api.getThumbMin(thumbProps.index ?? 0))
						}

						if (event.key === 'End'){
							event.preventDefault()
							api.setThumbValue(thumbProps.index ?? 0, api.getThumbMax(thumbProps.index ?? 0))
						}
					},
				})
			},
			getHiddenInputProps: (props = {})=> {
				const thumbProps = resolveThumbProps(props)
				return mergeProps(api.getHiddenInputProps(thumbProps), {
					type: 'hidden',
					value: String(api.getThumbValue(thumbProps.index ?? 0)),
				})
			},
		}
	})
}

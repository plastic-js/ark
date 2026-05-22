import * as splitter from '@zag-js/splitter'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createEffect, createSignal } from '../../runtime.js'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const splitSplitterProps = createSplitProps([
	...splitter.props,
	'value',
	'defaultValue',
	'onValueChange',
	'min',
	'max',
	'step',
	'disabled',
	'rootRef',
	'asChild',
	'children',
])

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useSplitter = (props = {})=> {
	const [machineProps, elementProps] = splitSplitterProps(props)
	const id = createUniqueId('splitter')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const panelIds = [
		`${id}--panel-0`,
		`${id}--panel-1`,
	]
	const resizeTriggerId = `${panelIds[0]}:${panelIds[1]}`
	const max = Number(machineProps.max ?? 80)
	const min = Number(machineProps.min ?? 20)
	const step = Number(machineProps.step ?? machineProps.keyboardResizeBy ?? 5)
	const orientation = machineProps.orientation ?? 'horizontal'
	const separatorOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal'
	const panels = machineProps.panels ?? [
		{
			id: panelIds[0],
			maxSize: max,
			minSize: min,
		},
		{
			id: panelIds[1],
			maxSize: 100 - min,
			minSize: 100 - max,
		},
	]
	const currentValue = createSignal(access(machineProps.value) ?? access(machineProps.defaultValue) ?? 50)
	const service = useMachine(splitter.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		orientation,
		keyboardResizeBy: step,
		size: access(machineProps.value) != null ? [access(machineProps.value), 100 - access(machineProps.value)] : access(machineProps.size),
		defaultSize: access(machineProps.defaultValue) != null ? [access(machineProps.defaultValue), 100 - access(machineProps.defaultValue)] : access(machineProps.defaultSize),
		panels,
		onResize: (details)=> {
			currentValue(details.size[0])
			machineProps.onResize?.(details)
			machineProps.onValueChange?.(details.size[0])
		},
	}))
	const getApi = ()=> splitter.connect(service, normalizeProps)
	let panelIndex = 0

	createEffect(()=> {
		if (access(machineProps.value) != null){
			currentValue(access(machineProps.value))
		}
	})

	const commitValue = (nextValue)=> {
		const clamped = Math.min(max, Math.max(min, nextValue))
		if (access(machineProps.value) == null){
			currentValue(clamped)
			getApi().setSizes([clamped, 100 - clamped])
		} else {
			machineProps.onValueChange?.(clamped)
		}
	}

	return createComputed(()=> {
		const api = splitter.connect(service, normalizeProps)
		return {
			...api,
			claimPanelIndex: ()=> {
				const index = panelIndex
				panelIndex += 1
				return index
			},
			getRootProps: ()=> mergeProps(api.getRootProps(), elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				'data-disabled': dataAttr(Boolean(machineProps.disabled)),
				'data-value': String(currentValue()),
				children: machineProps.children,
			}),
			getPanelProps: (index)=> {
				const panelId = panelIds[index] ?? panelIds[panelIds.length - 1]
				return mergeProps(api.getPanelProps({ id: panelId }), {
					style: {
						...api.getPanelProps({ id: panelId }).style,
						flex: index === 0 ? `0 0 ${currentValue()}%` : `1 1 ${100 - currentValue()}%`,
					},
				})
			},
			getResizeTriggerProps: ()=> mergeProps(api.getResizeTriggerProps({
				disabled: Boolean(machineProps.disabled),
				id: resizeTriggerId,
			}), {
				'aria-valuenow': String(currentValue()),
				'aria-valuemin': String(min),
				'aria-valuemax': String(max),
				'aria-orientation': separatorOrientation,
				'data-orientation': separatorOrientation,
			}),
		}
	})
}

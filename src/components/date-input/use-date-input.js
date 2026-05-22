import * as dateInput from '@zag-js/date-input'
import { normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createComputed,
	createEffect,
	createSignal,
} from '../../runtime.js'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useDateInput = (props = {})=> {
	const id = createUniqueId('date-input')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const version = createSignal(0)
	const segmentsVersion = createSignal(0)
	const service = useMachine(dateInput.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		shouldForceLeadingZeros: access(props.shouldForceLeadingZeros) ?? true,
		value: access(props.value) != null ? [dateInput.parse(access(props.value))] : undefined,
		defaultValue: access(props.defaultValue) != null ? [dateInput.parse(access(props.defaultValue))] : undefined,
		min: access(props.min),
		max: access(props.max),
		disabled: access(props.disabled),
		onValueChange: (details)=> {
			version(version() + 1)
			props.onValueChange?.(details.value[0]?.toString() ?? '')
		},
	}))
	const apiComputed = createComputed(()=> dateInput.connect(service, normalizeProps))

	let prevSegmentsKey = null
	let prevSegmentsContentKey = null
	const stableSegments = createSignal([])
	createEffect(()=> {
		const nextSegments = apiComputed().getSegments()
		const nextStructureKey = nextSegments.map(segment=> [
			segment.type,
			segment.index,
		].join(':')).join('|')
		const nextContentKey = nextSegments.map(segment=> [
			segment.type,
			segment.index,
			segment.text,
			segment.value,
			segment.placeholder,
			segment.isPlaceholder,
		].join(':')).join('|')

		// Keep the segment descriptor array stable by structure only. Text/value
		// updates are handled inside each DateInputSegment, while a stable array
		// preserves the existing DOM nodes so focus survives typing.
		if (nextStructureKey !== prevSegmentsKey){
			prevSegmentsKey = nextStructureKey
			stableSegments(nextSegments)
		} else {
			const currentSegments = stableSegments()
			// Zag binds segment event handlers to the segment object it receives.
			// Keep that object identity stable and mutate it in place so typing can
			// continue across updates without leaving handlers attached to stale data.
			nextSegments.forEach((nextSegment, index)=> {
				const stableSegment = currentSegments[index]
				if (!stableSegment){
					currentSegments[index] = nextSegment
					return
				}

				for (const key of Object.keys(stableSegment)){
					if (!(key in nextSegment)){
						delete stableSegment[key]
					}
				}

				Object.assign(stableSegment, nextSegment)
			})
		}

		if (nextContentKey !== prevSegmentsContentKey){
			prevSegmentsContentKey = nextContentKey
			segmentsVersion(segmentsVersion() + 1)
		}
	})

	const stableProxy = new Proxy({}, {
		get(_, key){
			if (key === 'getSegments'){ return stableSegments }
			return apiComputed()[key]
		},
		has(_, key){
			return key === 'getSegments' || key in apiComputed()
		},
	})

	const api = ()=> stableProxy
	api.version = version
	api.segmentsVersion = segmentsVersion
	return api
}

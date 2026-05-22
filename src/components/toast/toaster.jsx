import * as toast from '@zag-js/toast'
import { Loop, createEffect, onMount } from '../../runtime.js'
import { Portal } from '../portal/index.js'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { ark } from '../factory.js'
import { ToastProvider } from './toast-context.js'

const access = value=> typeof value === 'function' ? value() : value

const ToastActor = ({
	toastId, value, index, parent, children,
})=> {
	const environment = useEnvironmentContext()
	const locale = useLocaleContext()
	const service = useMachine(toast.machine, ()=> ({
		id: access(value)?.id ?? toastId,
		type: access(value)?.type ?? 'info',
		removeDelay: access(value)?.removeDelay ?? 200,
		...access(value) ?? {},
		parent,
		index,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
	}))

	// Re-measure after mount so stacked offsets use the live portal DOM height,
	// not the transient pre-layout height from the initial machine entry.
	onMount(()=> {
		service.send({ type: 'MEASURE' })
		requestAnimationFrame(()=> {
			service.send({ type: 'MEASURE' })
		})
	})

	const api = createComputed(()=> toast.connect(service, normalizeProps))
	return ToastProvider({ value: api, children: ()=> children(access(value) ?? {}) })
}

export const Toaster = (props = {})=> {
	const {
		toaster, children, ...restProps
	} = props
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()

	const service = useMachine(toast.group.machine, ()=> ({
		store: toaster,
		id: createUniqueId('toaster'),
		dir: locale.dir,
		getRootNode: environment.getRootNode,
	}))

	const api = createComputed(()=> toast.group.connect(service, normalizeProps))
	const toasts = createComputed(()=> api().getToasts())
	const toastById = createComputed(()=> new Map(toasts().map(toastItem=> [toastItem.id, toastItem])))
	const toastIds = createComputed(()=> toasts().map(toastItem=> toastItem.id))

	// Keep the measured height list in the same order as the rendered toasts.
	// Zag prepends new height entries, but expanded stack offsets are computed
	// from height order, so mismatches here produce visibly incorrect spacing.
	createEffect(()=> {
		const ids = toastIds()
		const heights = service.context.get('heights') ?? []
		if (ids.length <= 1 || heights.length <= 1){
			return
		}

		const heightsById = new Map(heights.map(item=> [item.id, item]))
		const ordered = ids.map(id=> heightsById.get(id)).filter(Boolean)
		const trailing = heights.filter(item=> !heightsById.has(item.id) || !ids.includes(item.id))
		const nextHeights = [...ordered, ...trailing]

		const isSameOrder = heights.length === nextHeights.length && heights.every((item, index)=> item.id === nextHeights[index]?.id)

		if (!isSameOrder){
			service.context.set('heights', nextHeights)
		}
	})

	const loop = Loop({
		each: toastIds,
		children: (toastId, index)=> ToastActor({
			toastId,
			value: ()=> toastById().get(toastId),
			// Preserve a live index accessor so overlap/stack transforms update when
			// the group prepends newer toasts ahead of older ones.
			index: createComputed(()=> index()),
			parent: service,
			children,
		}),
	})

	return Portal({
		children: ()=> ark.div(mergeProps(()=> api().getGroupProps(), restProps, { children: loop })),
	})
}

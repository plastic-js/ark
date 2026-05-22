import * as popover from '@zag-js/popover'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createEffect, onCleanup } from '../../runtime.js'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
	usePresenceStrategy,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { popoverAnatomy } from './popover.anatomy.js'

const splitPopoverProps = createSplitProps([
	...popover.props,
	'disabled',
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const usePopover = (props = {})=> {
	const [machineProps, elementProps] = splitPopoverProps(props)
	const id = createUniqueId('popover')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const anatomy = popoverAnatomy.build()
	const nodes = {
		content: null,
		trigger: null,
	}
	const service = useMachine(popover.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		closeOnInteractOutside: false,
		onOpenChange: details=> machineProps.onOpenChange?.(details.open),
	}))
	const getApi = ()=> popover.connect(service, normalizeProps)
	let dismissCleanup = ()=> {}
	const setupDismissable = ()=> {
		dismissCleanup()

		if (!service.state.matches('open') || machineProps.closeOnInteractOutside === false){
			return
		}

		const ownerDocument = environment.getDocument()
		if (!ownerDocument){
			return
		}

		const handlePointerDown = (event)=> {
			const target = event.target
			if (!(target instanceof Node)){
				return
			}

			if (nodes.trigger?.contains(target) || nodes.content?.contains(target)){
				return
			}

			machineProps.onPointerDownOutside?.(event)
			if (event.defaultPrevented){
				return
			}

			machineProps.onInteractOutside?.(event)
			if (event.defaultPrevented){
				return
			}

			getApi().setOpen(false)
		}

		ownerDocument.addEventListener('pointerdown', handlePointerDown)
		dismissCleanup = ()=> {
			ownerDocument.removeEventListener('pointerdown', handlePointerDown)
		}
	}

	const hasMounted = usePresenceStrategy(()=> service.state.matches('open'), machineProps.lazyMount)

	createEffect(()=> {
		setupDismissable()
	})

	onCleanup(()=> {
		dismissCleanup()
	})

	return createComputed(()=> {
		const api = getApi()
		return {
			...api,
			lazyMount: machineProps.lazyMount,
			unmounted: !api.open && (!hasMounted() || machineProps.unmountOnExit),
			unmountOnExit: machineProps.unmountOnExit,
			getRootProps: ()=> mergeProps(elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				'data-state': api.open ? 'open' : 'closed',
				'data-disabled': dataAttr(Boolean(machineProps.disabled)),
				children: machineProps.children,
			}),
			getTriggerProps: (props = {})=> mergeProps(api.getTriggerProps(props), {
				disabled: Boolean(machineProps.disabled),
				ref: mergeRefs(api.getTriggerProps(props).ref, (node)=> {
					nodes.trigger = node
				}),
			}),
			getContentProps: ()=> mergeProps(api.getContentProps(), {
				ref: mergeRefs(api.getContentProps().ref, (node)=> {
					nodes.content = node
				}),
			}),
		}
	})
}

import * as dialog from '@zag-js/dialog'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createEffect } from '../../runtime.js'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
	usePresenceStrategy,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { dialogAnatomy } from './dialog.anatomy.js'

const splitDialogProps = createSplitProps([
	...dialog.props,
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const useDialog = (props = {})=> {
	const [machineProps, elementProps] = splitDialogProps(props)
	const anatomy = dialogAnatomy.build()
	const id = createUniqueId('dialog')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const contentId = machineProps.ids?.content ?? `dialog:${id}:content`
	const getDefaultInitialFocusEl = ()=> {
		const documentNode = environment.getDocument()
		const contentNode = documentNode?.getElementById(contentId)
		if (!contentNode){
			return documentNode?.body ?? null
		}

		return contentNode.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? contentNode
	}
	const service = useMachine(dialog.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		initialFocusEl: machineProps.initialFocusEl ?? getDefaultInitialFocusEl,
		onOpenChange: details=> machineProps.onOpenChange?.(details.open),
	}))

	const hasMounted = usePresenceStrategy(()=> service.state.matches('open'), machineProps.lazyMount)

	createEffect(()=> {
		if (!service.state.matches('open')){
			return
		}

		requestAnimationFrame(()=> {
			const documentNode = environment.getDocument()
			const contentNode = documentNode?.getElementById(contentId)
			if (!contentNode){
				return
			}

			if (contentNode.contains(documentNode.activeElement)){
				return
			}

			const targetNode = (machineProps.initialFocusEl ?? getDefaultInitialFocusEl)?.() ?? contentNode
			targetNode?.focus?.({ preventScroll: true })
		})
	})

	return createComputed(()=> {
		const api = dialog.connect(service, normalizeProps)
		return {
			...api,
			lazyMount: machineProps.lazyMount,
			unmountOnExit: machineProps.unmountOnExit,
			unmounted: !api.open && (!hasMounted() || machineProps.unmountOnExit),
			getRootProps: ()=> mergeProps(elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				'data-state': api.open ? 'open' : 'closed',
				'data-disabled': dataAttr(false),
				children: machineProps.children,
			}),
		}
	})
}

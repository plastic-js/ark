import * as drawer from '@zag-js/drawer'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createEffect } from '../../runtime.js'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { drawerAnatomy } from './drawer.anatomy.js'

const splitDrawerProps = createSplitProps([
	...drawer.props,
	'placement',
	'rootRef',
	'asChild',
	'children',
])

export const useDrawer = (props = {})=> {
	const [machineProps, elementProps] = splitDrawerProps(props)
	const anatomy = drawerAnatomy.build()
	const id = createUniqueId('drawer')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const contentId = machineProps.ids?.content ?? `drawer:${id}:content`
	const service = useMachine(drawer.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		swipeDirection: machineProps.swipeDirection ?? (machineProps.placement === 'left' ? 'start' : machineProps.placement === 'right' ? 'end' : machineProps.placement),
		onOpenChange: details=> machineProps.onOpenChange?.(details.open),
	}))

	createEffect(()=> {
		if (!service.state.matches('closing')){
			return
		}

		requestAnimationFrame(()=> {
			if (!service.state.matches('closing')){
				return
			}

			const documentNode = environment.getDocument()
			const contentNode = documentNode?.getElementById(contentId)
			if (!contentNode){
				return
			}

			contentNode.dispatchEvent(new CustomEvent('exitcomplete'))
		})
	})

	return createComputed(()=> {
		const api = drawer.connect(service, normalizeProps)
		return {
			...api,
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

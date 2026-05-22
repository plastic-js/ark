import * as presence from '@zag-js/presence'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	mergeRefs,
	runIfFn,
} from '../../utils/index.js'
import { presenceAnatomy } from './presence.anatomy.js'

const splitPresenceProps = createSplitProps([
	'present',
	'onExitComplete',
	'immediate',
	'rootRef',
	'asChild',
	'children',
])

export const usePresence = (props = {})=> {
	const [localProps, elementProps] = splitPresenceProps(props)
	const anatomy = presenceAnatomy.build()

	const service = useMachine(presence.machine, ()=> ({
		present: Boolean(runIfFn(localProps.present)),
		onExitComplete: localProps.onExitComplete,
		immediate: localProps.immediate,
	}))

	return createComputed(()=> {
		const api = presence.connect(service, normalizeProps)
		return {
			present: api.present,
			getRootProps: ()=> ({
				...elementProps,
				ref: mergeRefs(elementProps.ref, localProps.rootRef, api.setNode),
				asChild: localProps.asChild,
				'data-state': ()=> runIfFn(localProps.present) ? 'open' : 'closed',
				...anatomy.root.attrs,
				children: localProps.children,
			}),
		}
	})
}

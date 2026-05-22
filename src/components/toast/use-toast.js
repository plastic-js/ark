import * as toast from '@zag-js/toast'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useToast = (props = {})=> {
	const id = access(props.id) ?? createUniqueId('toast')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const parent = {
		computed: key=> key === 'placement' ? 'bottom' : undefined,
		prop: key=> key === 'store' ? { attrs: { gap: 0 } } : undefined,
		context: { get: ()=> [], set: ()=> {} },
	}
	const service = useMachine(toast.machine, ()=> ({
		id,
		dir: access(props.dir) ?? locale.dir,
		getRootNode: environment.getRootNode,
		parent,
		type: access(props.type) ?? 'info',
		removeDelay: access(props.removeDelay) ?? 0,
		title: props.title,
		description: props.description,
		duration: access(props.duration) ?? 5000,
		action: props.action,
		closable: access(props.closable),
		meta: props.meta,
		priority: access(props.priority),
		translations: props.translations,
		index: access(props.index),
		onStatusChange: (details)=> {
			props.onStatusChange?.(details)
			if (details.status === 'visible'){ props.onOpenChange?.(true) }
			if (details.status === 'dismissing' || details.status === 'unmounted'){ props.onOpenChange?.(false) }
		},
	}))

	return createComputed(()=> toast.connect(service, normalizeProps))
}

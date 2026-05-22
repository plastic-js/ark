import * as avatar from '@zag-js/avatar'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useAvatar = (props = {})=> {
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(avatar.machine, ()=> ({
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		onStatusChange: (details)=> {
			const onStatusChange = props.onStatusChange
			if (typeof onStatusChange === 'function'){
				onStatusChange(details)
			}
		},
	}))

	return createComputed(()=> avatar.connect(service, normalizeProps))
}

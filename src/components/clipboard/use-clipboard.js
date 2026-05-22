import * as clipboard from '@zag-js/clipboard'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useClipboard = (props = {})=> {
	const id = createUniqueId('clipboard')
	const environment = useEnvironmentContext()
	const service = useMachine(clipboard.machine, ()=> ({
		id,
		getRootNode: environment.getRootNode,
		...props,
		value: access(props.value),
		defaultValue: access(props.defaultValue),
		timeout: access(props.timeout),
		onValueChange: (details)=> {
			const onValueChange = props.onValueChange
			if (typeof onValueChange === 'function'){
				onValueChange(details)
			}
		},
		onStatusChange: (details)=> {
			const onStatusChange = props.onStatusChange
			if (typeof onStatusChange === 'function'){
				onStatusChange(details)
			}
		},
	}))

	return createComputed(()=> clipboard.connect(service, normalizeProps))
}

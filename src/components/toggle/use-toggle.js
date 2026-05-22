import * as toggle from '@zag-js/toggle'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useToggle = (props = {})=> {
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(toggle.machine, ()=> ({
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		pressed: access(props.pressed),
		defaultPressed: access(props.defaultPressed),
		disabled: access(props.disabled),
	}))

	return createComputed(()=> toggle.connect(service, normalizeProps))
}

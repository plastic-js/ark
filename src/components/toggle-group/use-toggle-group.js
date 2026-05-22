import * as toggleGroup from '@zag-js/toggle-group'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useToggleGroup = (props = {})=> {
	const id = createUniqueId('toggle-group')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(toggleGroup.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		value: access(props.value),
		defaultValue: access(props.defaultValue),
		disabled: access(props.disabled),
		onValueChange: details=> props.onValueChange?.(details.value),
	}))

	return createComputed(()=> toggleGroup.connect(service, normalizeProps))
}

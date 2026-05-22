import * as accordion from '@zag-js/accordion'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createSplitProps, createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

const normalizeValue = (value)=> {
	return value == null ? undefined : Array.isArray(value) ? value : [value]
}

const splitAccordionRenderProps = createSplitProps(['lazyMount', 'unmountOnExit'])

export const useAccordion = (props = {})=> {
	const [renderProps, machineProps] = splitAccordionRenderProps(props)
	const id = createUniqueId('accordion')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(accordion.machine, ()=> {
		const controlledValue = access(machineProps.value)
		const defaultValue = access(machineProps.defaultValue)
		const multiple = access(machineProps.multiple) ?? (Array.isArray(controlledValue) || Array.isArray(defaultValue))

		return {
			id,
			dir: locale.dir,
			getRootNode: environment.getRootNode,
			...machineProps,
			value: normalizeValue(controlledValue),
			defaultValue: normalizeValue(defaultValue),
			onValueChange: details=> machineProps.onValueChange?.(multiple ? details.value : details.value[0] ?? null),
			onFocusChange: details=> machineProps.onFocusChange?.(details.value),
		}
	})

	return createComputed(()=> ({
		...accordion.connect(service, normalizeProps),
		send: service.send.bind(service),
		lazyMount: renderProps.lazyMount ?? false,
		unmountOnExit: renderProps.unmountOnExit ?? false,
	}))
}

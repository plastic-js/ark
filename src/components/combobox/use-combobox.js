import * as combobox from '@zag-js/combobox'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useCombobox = (props = {})=> {
	const id = createUniqueId('combobox')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(combobox.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		open: access(props.open),
		defaultOpen: access(props.defaultOpen),
		value: access(props.value),
		defaultValue: access(props.defaultValue),
		inputValue: access(props.inputValue),
		defaultInputValue: access(props.defaultInputValue) ?? '',
		disabled: access(props.disabled),
		onOpenChange: details=> props.onOpenChange?.(details.open),
		onValueChange: details=> props.onValueChange?.(details.value),
		onInputValueChange: details=> props.onInputValueChange?.(details.inputValue),
		onHighlightChange: details=> props.onHighlightChange?.(details.highlightedValue),
		onSelect: details=> props.onSelect?.(details.value),
	}))

	return createComputed(()=> combobox.connect(service, normalizeProps))
}

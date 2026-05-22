import * as select from '@zag-js/select'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useSelect = (props = {})=> {
	const id = createUniqueId('select')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(select.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		open: access(props.open),
		defaultOpen: access(props.defaultOpen),
		value: access(props.value) != null ? [access(props.value)].flat() : undefined,
		defaultValue: access(props.defaultValue) != null ? [access(props.defaultValue)].flat() : undefined,
		multiple: access(props.multiple),
		disabled: access(props.disabled),
		invalid: access(props.invalid),
		onOpenChange: details=> props.onOpenChange?.(details.open),
		onValueChange: details=> props.onValueChange?.(details.value),
		onHighlightChange: details=> props.onHighlightChange?.(details.highlightedValue),
		onSelect: details=> props.onSelect?.(details.value),
	}))

	return createComputed(()=> {
		const api = select.connect(service, normalizeProps)
		return {
			...api,
			getValueTextProps: ()=> mergeProps(api.getValueTextProps(), {
				textContent: ()=> {
					const items = access(props.collection)?.items ?? []
					return api.value.map((v)=> {
						const item = items.find(i=> i.value === v)
						return item ? item.label : v
					}).join(', ') || ''
				},
			}),
		}
	})
}

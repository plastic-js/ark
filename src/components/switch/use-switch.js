import * as switchComponent from '@zag-js/switch'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { useFieldContext } from '../field/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

const toChecked = (details)=> {
	if (details && typeof details === 'object' && 'checked' in details){
		return details.checked
	}

	return details
}

export const useSwitch = (props = {})=> {
	const id = createUniqueId('switch')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const field = useFieldContext()
	const service = useMachine(switchComponent.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		checked: access(props.checked),
		defaultChecked: access(props.defaultChecked),
		ids: {
			...props.ids,
			label: props.ids?.label ?? field?.ids?.label,
			hiddenInput: props.ids?.hiddenInput ?? props.ids?.input ?? field?.ids?.control,
		},
		disabled: access(props.disabled) ?? field?.disabled?.(),
		invalid: access(props.invalid) ?? field?.invalid?.(),
		onCheckedChange: (details)=> {
			const onCheckedChange = props.onCheckedChange
			if (typeof onCheckedChange === 'function'){
				onCheckedChange(toChecked(details))
			}
		},
		readOnly: access(props.readOnly) ?? field?.readOnly?.(),
		required: access(props.required) ?? field?.required?.(),
	}))

	return createComputed(()=> {
		const api = switchComponent.connect(service, normalizeProps)
		return {
			...api,
			getHiddenInputProps: ()=> mergeProps(api.getHiddenInputProps(), {
				tabIndex: -1,
				'aria-hidden': undefined,
				onChange: event=> api.setChecked(event.currentTarget.checked),
				checked: api.checked,
				disabled: api.disabled,
			}),
		}
	})
}

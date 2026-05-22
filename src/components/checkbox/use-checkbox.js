import * as checkbox from '@zag-js/checkbox'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { useFieldsetContext } from '../fieldset/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

const toChecked = (details)=> {
	if (details && typeof details === 'object' && 'checked' in details){
		return !!details.checked
	}

	return !!details
}

export const useCheckbox = (props = {})=> {
	const id = createUniqueId('checkbox')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const fieldset = useFieldsetContext()
	const service = useMachine(checkbox.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		checked: access(props.checked),
		defaultChecked: access(props.defaultChecked),
		disabled: access(props.disabled) ?? fieldset?.disabled?.(),
		invalid: access(props.invalid) ?? fieldset?.invalid?.(),
		onCheckedChange: (details)=> {
			const onCheckedChange = props.onCheckedChange
			if (typeof onCheckedChange === 'function'){
				onCheckedChange(toChecked(details))
			}
		},
	}))

	return createComputed(()=> {
		const api = checkbox.connect(service, normalizeProps)
		return {
			...api,
			getControlProps: ()=> mergeProps(api.getControlProps(), {
				type: 'button',
				role: 'checkbox',
				'aria-hidden': undefined,
				'aria-disabled': api.disabled ? 'true' : undefined,
				disabled: api.disabled,
			}),
			getHiddenInputProps: ()=> mergeProps(api.getHiddenInputProps(), {
				tabIndex: -1,
				'aria-hidden': undefined,
				onChange: event=> api.setChecked(event.currentTarget.checked),
				checked: api.checked,
				disabled: api.disabled,
				'aria-invalid': api.getHiddenInputProps()['aria-invalid'],
			}),
		}
	})
}

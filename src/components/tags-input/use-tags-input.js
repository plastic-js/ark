import * as tagsInput from '@zag-js/tags-input'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useTagsInput = (props = {})=> {
	const id = createUniqueId('tags-input')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(tagsInput.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		value: access(props.value) != null ? access(props.value) : undefined,
		defaultValue: access(props.defaultValue) ?? [],
		disabled: access(props.disabled),
		onValueChange: details=> props.onValueChange?.(details.value),
		onInputValueChange: details=> props.onInputValueChange?.(details.inputValue),
	}))

	return createComputed(()=> {
		const api = tagsInput.connect(service, normalizeProps)
		return {
			...api,
			getHiddenInputProps: ()=> mergeProps(api.getHiddenInputProps(), {
				value: api.getHiddenInputProps().defaultValue,
			}),
		}
	})
}

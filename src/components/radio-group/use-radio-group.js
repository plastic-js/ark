import * as radioGroup from '@zag-js/radio-group'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { useFieldsetContext } from '../fieldset/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useRadioGroup = (props = {})=> {
	const id = createUniqueId('radio-group')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const fieldset = useFieldsetContext()
	const service = useMachine(radioGroup.machine, ()=> {
		const nextProps = {
			id,
			dir: locale.dir,
			disabled: access(props.disabled) ?? fieldset?.disabled?.(),
			invalid: access(props.invalid) ?? fieldset?.invalid?.(),
			getRootNode: environment.getRootNode,
			...props,
			onValueChange: details=> props.onValueChange?.(details.value),
		}

		if (fieldset?.ids?.legend || props.ids){
			nextProps.ids = {
				label: fieldset?.ids?.legend,
				...props.ids,
			}
		}

		return nextProps
	})

	return createComputed(()=> radioGroup.connect(service, normalizeProps))
}

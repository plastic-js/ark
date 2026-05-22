import * as ratingGroup from '@zag-js/rating-group'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { useFieldContext } from '../field/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useRatingGroup = (props = {})=> {
	const id = createUniqueId('rating-group')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const field = useFieldContext()
	const service = useMachine(ratingGroup.machine, ()=> ({
		id,
		...props,
		ids: {
			...props.ids,
			label: field?.ids?.label,
			hiddenInput: field?.ids?.control,
		},
		disabled: access(props.disabled) ?? field?.disabled?.(),
		readOnly: access(props.readOnly) ?? field?.readOnly?.(),
		required: access(props.required) ?? field?.required?.(),
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		onHoverChange: details=> props.onHoverChange?.(details.hoveredValue),
		onValueChange: details=> props.onValueChange?.(details.value),
	}))

	return createComputed(()=> ratingGroup.connect(service, normalizeProps))
}

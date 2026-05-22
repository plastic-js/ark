import * as steps from '@zag-js/steps'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useSteps = (props = {})=> {
	const id = createUniqueId('steps')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(steps.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		step: access(props.step),
		defaultStep: access(props.defaultStep),
		count: access(props.count),
		linear: access(props.linear),
		orientation: access(props.orientation),
		onStepChange: (details)=> {
			const onStepChange = props.onStepChange
			if (typeof onStepChange === 'function'){
				onStepChange(details)
			}
		},
		onStepComplete: ()=> {
			const onStepComplete = props.onStepComplete
			if (typeof onStepComplete === 'function'){
				onStepComplete()
			}
		},
	}))

	return createComputed(()=> steps.connect(service, normalizeProps))
}

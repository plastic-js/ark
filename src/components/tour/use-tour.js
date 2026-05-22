import * as tour from '@zag-js/tour'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createSplitProps, createUniqueId, mergeProps } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const splitTourProps = createSplitProps([
	...tour.props,
	'children',
])

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useTour = (props = {})=> {
	const [machineProps] = splitTourProps(props)
	const id = createUniqueId('tour')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(tour.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		open: access(machineProps.open),
		defaultOpen: access(machineProps.defaultOpen),
		steps: access(machineProps.steps),
		stepId: access(machineProps.step) != null ? machineProps.steps?.[access(machineProps.step)]?.id : undefined,
		onStatusChange: details=> machineProps.onOpenChange?.(details.open),
		onStepChange: details=> machineProps.onStepChange?.(machineProps.steps?.findIndex(s=> s.id === details.stepId) ?? 0),
	}))

	return createComputed(()=> {
		const api = tour.connect(service, normalizeProps)
		return {
			...api,
			getTitleProps: ()=> mergeProps(api.getTitleProps(), {
				children: api.step?.title ?? '',
			}),
			getDescriptionProps: ()=> mergeProps(api.getDescriptionProps(), {
				children: api.step?.description ?? '',
			}),
		}
	})
}

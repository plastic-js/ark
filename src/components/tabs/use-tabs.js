import * as tabs from '@zag-js/tabs'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createSplitProps, createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const splitTabsRenderProps = createSplitProps(['lazyMount', 'unmountOnExit'])

export const useTabs = (props = {})=> {
	const [renderProps, machineProps] = splitTabsRenderProps(props)
	const id = createUniqueId('tabs')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(tabs.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		onValueChange: details=> machineProps.onValueChange?.(details.value),
		onFocusChange: details=> machineProps.onFocusChange?.(details.value),
	}))
	return createComputed(()=> ({
		...tabs.connect(service, normalizeProps),
		lazyMount: renderProps.lazyMount ?? false,
		unmountOnExit: renderProps.unmountOnExit ?? false,
	}))
}

import * as progress from '@zag-js/progress'
import { normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { createComputed } from '../../runtime.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

export const useProgress = (props = {})=> {
	const id = createUniqueId('progress')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()

	let translations = props.translations
	if (props.getValueText){
		translations = {
			...props.translations,
			value: ({ value })=> props.getValueText(value),
		}
	}

	const service = useMachine(progress.machine, ()=> ({
		id,
		locale: locale.locale,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		translations,
		...props,
	}))

	return createComputed(()=> progress.connect(service, normalizeProps))
}

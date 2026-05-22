import * as signaturePad from '@zag-js/signature-pad'
import { normalizeProps, useMachine } from '@plastic-js/zag'
import { createComputed } from '../../runtime.js'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useSignaturePad = (props = {})=> {
	const id = createUniqueId('signature-pad')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(signaturePad.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		disabled: access(props.disabled),
	}))

	return createComputed(()=> signaturePad.connect(service, normalizeProps))
}

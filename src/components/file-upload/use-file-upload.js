import * as fileUpload from '@zag-js/file-upload'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

export const useFileUpload = (props = {})=> {
	const id = createUniqueId('file-upload')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(fileUpload.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		accept: access(props.accept),
		multiple: access(props.multiple),
		disabled: access(props.disabled),
		onFileChange: details=> props.onFilesChange?.(details.acceptedFiles),
	}))

	return createComputed(()=> fileUpload.connect(service, normalizeProps))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'

export const FileUploadHiddenInput = (props = {})=> {
	const fileUpload = useFileUploadContext()
	const zagProps = ()=> {
		const p = fileUpload().getHiddenInputProps()
		// Mirror onInput to onChange so native `change` events (e.g. in tests)
		// are handled the same way as `input` events.
		if (p.onInput && !p.onChange){
			p.onChange = p.onInput
		}
		return p
	}
	return ark.input(mergeProps(zagProps, props))
}

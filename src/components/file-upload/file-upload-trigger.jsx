import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'

export const FileUploadTrigger = (props = {})=> {
	const fileUpload = useFileUploadContext()
	return ark.button(mergeProps(()=> fileUpload().getTriggerProps(), props))
}

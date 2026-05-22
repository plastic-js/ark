import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'

export const FileUploadClearTrigger = (props = {})=> {
	const fileUpload = useFileUploadContext()
	return ark.button(mergeProps(()=> fileUpload().getClearTriggerProps(), props))
}

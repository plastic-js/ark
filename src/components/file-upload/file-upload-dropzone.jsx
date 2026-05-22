import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'

export const FileUploadDropzone = (props = {})=> {
	const fileUpload = useFileUploadContext()
	return ark.div(mergeProps(()=> fileUpload().getDropzoneProps(), props))
}

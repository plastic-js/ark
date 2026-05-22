import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'

export const FileUploadLabel = (props = {})=> {
	const fileUpload = useFileUploadContext()
	return ark.label(mergeProps(()=> fileUpload().getLabelProps(), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'

export const FileUploadItemGroup = (props = {})=> {
	const fileUpload = useFileUploadContext()
	return ark.ul(mergeProps(()=> fileUpload().getItemGroupProps(), props))
}

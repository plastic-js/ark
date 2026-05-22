import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'
import { useFileUploadItemContext } from './file-upload-item-context.js'

export const FileUploadItemSizeText = (props = {})=> {
	const fileUpload = useFileUploadContext()
	const file = useFileUploadItemContext()
	return ark.span(mergeProps(()=> fileUpload().getItemSizeTextProps({ file: file() }), props))
}

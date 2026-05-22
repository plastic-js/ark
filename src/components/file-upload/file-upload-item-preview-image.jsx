import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'
import { useFileUploadItemContext } from './file-upload-item-context.js'

const splitProps = createSplitProps(['src'])

export const FileUploadItemPreviewImage = (props = {})=> {
	const fileUpload = useFileUploadContext()
	const file = useFileUploadItemContext()
	const [localProps, elementProps] = splitProps(props)
	return ark.img(mergeProps(()=> fileUpload().getItemPreviewImageProps({ file: file(), src: localProps.src }), elementProps))
}

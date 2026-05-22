import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFileUploadContext } from './file-upload-context.js'
import { FileUploadItemProvider } from './file-upload-item-context.js'

const splitItemProps = createSplitProps(['file', 'children'])

export const FileUploadItem = (props = {})=> {
	const fileUpload = useFileUploadContext()
	const [localProps, elementProps] = splitItemProps(props)
	return FileUploadItemProvider({
		value: ()=> localProps.file,
		children: ()=> ark.li(mergeProps(()=> fileUpload().getItemProps({ file: localProps.file }), elementProps, {
			children: localProps.children,
		})),
	})
}

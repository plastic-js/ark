import * as fileUpload from '@zag-js/file-upload'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { FileUploadProvider } from './file-upload-context.js'
import { useFileUpload } from './use-file-upload.js'

const splitFileUploadProps = createSplitProps(fileUpload.props)

export const FileUploadRoot = (props = {})=> {
	const { onFilesChange, ...rest } = props
	const [machineProps, elementProps] = splitFileUploadProps(rest)
	const api = useFileUpload({ onFilesChange, ...machineProps })
	return FileUploadProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

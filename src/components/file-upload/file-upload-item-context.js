import { createContext } from '../../utils/index.js'

export const [FileUploadItemProvider, useFileUploadItemContext] = createContext({
	hookName: 'useFileUploadItemContext',
	providerName: '<FileUpload.Item />',
})

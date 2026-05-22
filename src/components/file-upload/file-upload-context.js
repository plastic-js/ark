import { createContext } from '../../utils/index.js'

export const [FileUploadProvider, useFileUploadContext] = createContext({
	hookName: 'useFileUploadContext',
	providerName: '<FileUpload.Root />',
})

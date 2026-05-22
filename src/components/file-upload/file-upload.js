import { FileUploadClearTrigger } from './file-upload-clear-trigger.jsx'
import { FileUploadDropzone } from './file-upload-dropzone.jsx'
import { FileUploadHiddenInput } from './file-upload-hidden-input.jsx'
import { FileUploadItem } from './file-upload-item.jsx'
import { FileUploadItemDeleteTrigger } from './file-upload-item-delete-trigger.jsx'
import { FileUploadItemGroup } from './file-upload-item-group.jsx'
import { FileUploadItemName } from './file-upload-item-name.jsx'
import { FileUploadItemPreview } from './file-upload-item-preview.jsx'
import { FileUploadItemPreviewImage } from './file-upload-item-preview-image.jsx'
import { FileUploadItemSizeText } from './file-upload-item-size-text.jsx'
import { FileUploadLabel } from './file-upload-label.jsx'
import { FileUploadRoot } from './file-upload-root.jsx'
import { FileUploadTrigger } from './file-upload-trigger.jsx'

const fileUploadParts = {
	Root: FileUploadRoot,
	Label: FileUploadLabel,
	Trigger: FileUploadTrigger,
	Dropzone: FileUploadDropzone,
	HiddenInput: FileUploadHiddenInput,
	ClearTrigger: FileUploadClearTrigger,
	ItemGroup: FileUploadItemGroup,
	Item: FileUploadItem,
	ItemName: FileUploadItemName,
	ItemSizeText: FileUploadItemSizeText,
	ItemPreview: FileUploadItemPreview,
	ItemPreviewImage: FileUploadItemPreviewImage,
	ItemDeleteTrigger: FileUploadItemDeleteTrigger,
}

export const FileUpload = Object.assign(FileUploadRoot, fileUploadParts)
export {
	FileUploadRoot as Root,
	FileUploadLabel as Label,
	FileUploadTrigger as Trigger,
	FileUploadDropzone as Dropzone,
	FileUploadHiddenInput as HiddenInput,
	FileUploadClearTrigger as ClearTrigger,
	FileUploadItemGroup as ItemGroup,
	FileUploadItem as Item,
	FileUploadItemName as ItemName,
	FileUploadItemSizeText as ItemSizeText,
	FileUploadItemPreview as ItemPreview,
	FileUploadItemPreviewImage as ItemPreviewImage,
	FileUploadItemDeleteTrigger as ItemDeleteTrigger,
}

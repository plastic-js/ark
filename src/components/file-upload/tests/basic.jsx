import { FileUpload } from '../index.js'

export const ComponentUnderTest = ({ files = [], ...props }) => (
  <FileUpload.Root {...props}>
    <FileUpload.Label>Attachments</FileUpload.Label>
    <FileUpload.Trigger>Choose</FileUpload.Trigger>
    <FileUpload.Dropzone>Drop here</FileUpload.Dropzone>
    <FileUpload.HiddenInput />
    <FileUpload.ClearTrigger>Clear</FileUpload.ClearTrigger>
    <FileUpload.ItemGroup>
      {files.map(file => (
        <FileUpload.Item file={file} key={file.name}>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>✕</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  </FileUpload.Root>
)

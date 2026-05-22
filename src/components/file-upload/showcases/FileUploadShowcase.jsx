import { createSignal } from '../../../runtime.js'
import { css } from '@emotion/css'
import { FileUpload } from '../../../index.js'

const dropzoneClass = css({
	padding: '16px',
	border: '1px dashed rgba(29, 41, 53, 0.18)',
	background: 'rgba(255, 255, 255, 0.62)',
	borderRadius: '16px',
})

const FileUploadShowcase = ()=> {
	const files = createSignal([])

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>FileUpload</h1>
				<p className='hero-copy'>Live, component-specific demo for FileUpload.</p>
			</header>
			<section className='feature-card'>
				<FileUpload.Root files={files} multiple onFilesChange={files}>
					<FileUpload.Label>Attachments</FileUpload.Label>
					<div className='button-row'>
						<FileUpload.Trigger>Choose files</FileUpload.Trigger>
						<FileUpload.ClearTrigger>Clear</FileUpload.ClearTrigger>
					</div>
					<FileUpload.Dropzone className={dropzoneClass}>Drop assets here or use the trigger.</FileUpload.Dropzone>
					<FileUpload.HiddenInput />
					<FileUpload.ItemGroup>
						{()=> files().map(file=> (
							<FileUpload.Item file={file} key={file.name}>
								<FileUpload.ItemName />
								<FileUpload.ItemSizeText />
								<FileUpload.ItemDeleteTrigger>✕</FileUpload.ItemDeleteTrigger>
							</FileUpload.Item>
						))}
					</FileUpload.ItemGroup>
				</FileUpload.Root>
				<div className='checklist'>
					Selected files
					{()=> files().length}
				</div>
				<code className='anatomy'>{`<FileUpload.Root>
  <FileUpload.Label />
  <FileUpload.Dropzone />
  <FileUpload.Trigger />
  <FileUpload.HiddenInput />
  <FileUpload.ClearTrigger />
  <FileUpload.ItemGroup>
    <FileUpload.Item>
      <FileUpload.ItemPreview>
        <FileUpload.ItemPreviewImage />
      </FileUpload.ItemPreview>
      <FileUpload.ItemName />
      <FileUpload.ItemSizeText />
      <FileUpload.ItemDeleteTrigger />
    </FileUpload.Item>
  </FileUpload.ItemGroup>
</FileUpload.Root>`}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default FileUploadShowcase

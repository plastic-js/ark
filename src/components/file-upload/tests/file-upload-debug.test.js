// @vitest-environment jsdom

import { it, vi } from 'vitest'
import { FileUpload, useFileUploadContext } from '../index.js'
import { createContext, h, renderApp, useContext } from '../../../runtime.js'

// Use context to get the API
let capturedApi = null
const ApiCapture = ()=> {
	capturedApi = useFileUploadContext()
	return null
}

it('debug v6 - use context API directly', ()=> {
	const container = document.createElement('div')
	document.body.append(container)
	const spy = vi.fn()

	renderApp(container, h(FileUpload.Root, {
		onFilesChange: spy,
		children: [
			h(FileUpload.HiddenInput),
			h(ApiCapture),
		],
	}))

	console.log('capturedApi:', !!capturedApi)
	if (capturedApi){
		const api = capturedApi()
		console.log('api methods:', Object.keys(api).filter(k=> typeof api[k] === 'function').join(', '))

		const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
		if (api.setFiles){
			api.setFiles([file])
			console.log('spy after setFiles:', spy.mock.calls.length)
		}
	}
})

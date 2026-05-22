// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { FileUpload } from '../index.js'
import {
	createSignal,
	h,
	renderApp,
} from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic FileUpload', ()=> {
	it('renders trigger, dropzone, and clear trigger', ()=> {
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(FileUpload.Root, {
			children: [
				h(FileUpload.Trigger, null, 'Choose'),
				h(FileUpload.Dropzone, null, 'Drop here'),
				h(FileUpload.HiddenInput),
				h(FileUpload.ClearTrigger, null, 'Clear'),
			],
		}))

		const trigger = container.querySelector('[data-part="trigger"]')
		const dropzone = container.querySelector('[data-part="dropzone"]')
		const input = container.querySelector('input[type="file"]')
		const clearTrigger = container.querySelector('[data-part="clear-trigger"]')

		expect(trigger).toBeTruthy()
		expect(dropzone).toBeTruthy()
		expect(input).toBeTruthy()
		expect(clearTrigger).toBeTruthy()
		expect(input.tabIndex).toBe(-1)
	})

	it('calls onFilesChange with the accepted File array', async()=> {
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onFilesChange: spy }))

		const input = container.querySelector('input[type="file"]')
		const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })

		Object.defineProperty(input, 'files', {
			configurable: true,
			get: ()=> ({
				0: file, length: 1, item: i=> [file][i], [Symbol.iterator]: function *(){ yield file },
			}),
		})
		input.dispatchEvent(new Event('change', { bubbles: true }))

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toEqual([file])
	})
})

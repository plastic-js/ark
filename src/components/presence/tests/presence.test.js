// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { Presence, presenceAnatomy } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'

const nextFrame = ()=> new Promise(resolve=> setTimeout(resolve, 16))

describe('@ark-ui/plastic Presence', ()=> {
	it('exposes Root through the namespace contract', ()=> {
		expect(typeof Presence).toBe('function')
		expect(Presence.Root).toBe(Presence)
		expect(presenceAnatomy.keys()).toEqual(['root'])
	})

	it('mounts the node when present is true', ()=> {
		const present = createSignal(true)
		const container = document.createElement('div')

		renderApp(container, h(Presence, {
			present,
			children: 'content',
		}))

		const element = container.querySelector('[data-scope="presence"]')
		expect(element).not.toBeNull()
		expect(element.dataset.state).toBe('open')
	})

	it('sets data-state to closed immediately when present goes false', ()=> {
		const present = createSignal(true)
		const container = document.createElement('div')

		renderApp(container, h(Presence, {
			present,
			children: 'content',
		}))

		present(false)

		const element = container.querySelector('[data-scope="presence"]')
		expect(element.dataset.state).toBe('closed')
	})

	it('unmounts the node after present goes false (no animation)', async()=> {
		const present = createSignal(true)
		const container = document.createElement('div')

		renderApp(container, h(Presence, {
			present,
			children: 'content',
		}))

		present(false)
		await nextFrame()

		expect(container.querySelector('[data-scope="presence"]')).toBeNull()
	})

	it('calls onExitComplete after unmounting', async()=> {
		const present = createSignal(true)
		const container = document.createElement('div')
		let called = false

		renderApp(container, h(Presence, {
			present,
			onExitComplete: ()=> { called = true },
			children: 'content',
		}))

		present(false)
		await nextFrame()

		expect(called).toBe(true)
	})
})

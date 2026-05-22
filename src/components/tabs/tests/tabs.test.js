// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Tabs } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	document.body.innerHTML = ''
})

const renderTabs = (props = {})=> {
	const container = document.createElement('div')
	renderApp(container, h(Tabs.Root, {
		defaultValue: 'a',
		activationMode: 'manual',
		...props,
		children: [
			h(Tabs.List, null, h(Tabs.Trigger, { value: 'a' }, 'Tab A'), h(Tabs.Trigger, { value: 'b' }, 'Tab B')),
			h(Tabs.Content, { value: 'a' }, 'Content A'),
			h(Tabs.Content, { value: 'b' }, 'Content B'),
		],
	}))
	return container
}

describe('@ark-ui/plastic Tabs', ()=> {
	it('renders the default selected tab', ()=> {
		const container = renderTabs()
		const triggers = container.querySelectorAll('[data-part="trigger"]')
		expect(triggers[0].getAttribute('aria-selected')).toBe('true')
		expect(triggers[1].getAttribute('aria-selected')).not.toBe('true')
	})

	it('switches active tab on click', async()=> {
		const user = userEvent.setup()
		const container = renderTabs()
		const triggers = ()=> container.querySelectorAll('[data-part="trigger"]')
		const contents = ()=> container.querySelectorAll('[data-part="content"]')

		await user.click(triggers()[1])
		expect(triggers()[0].getAttribute('aria-selected')).not.toBe('true')
		expect(triggers()[1].getAttribute('aria-selected')).toBe('true')
		expect(contents()[0].getAttribute('hidden')).toBe('')
		expect(contents()[1].getAttribute('hidden')).toBeNull()
	})

	it('uncontrolled: defaultValue sets initial tab; machine owns subsequent updates', async()=> {
		const user = userEvent.setup()
		const container = renderTabs()

		const triggers = ()=> container.querySelectorAll('[data-part="trigger"]')
		const contents = ()=> container.querySelectorAll('[data-part="content"]')

		expect(triggers()[0].getAttribute('aria-selected')).toBe('true')
		expect(contents()[0].getAttribute('hidden')).toBeNull()

		await user.click(triggers()[1])
		expect(triggers()[1].getAttribute('aria-selected')).toBe('true')
		expect(contents()[1].getAttribute('hidden')).toBeNull()
	})

	it('controlled: signal as value prevents updates; callback fires; external update applies', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const value = createSignal('a')
		const spy = vi.fn()

		renderApp(container, h(Tabs.Root, {
			value,
			onValueChange: spy,
			activationMode: 'manual',
			children: [
				h(Tabs.List, null, h(Tabs.Trigger, { value: 'a' }, 'Tab A'), h(Tabs.Trigger, { value: 'b' }, 'Tab B')),
				h(Tabs.Content, { value: 'a' }, 'Content A'),
				h(Tabs.Content, { value: 'b' }, 'Content B'),
			],
		}))

		const triggers = ()=> container.querySelectorAll('[data-part="trigger"]')
		const contents = ()=> container.querySelectorAll('[data-part="content"]')

		await user.click(triggers()[1])
		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe('b')
		expect(triggers()[0].getAttribute('aria-selected')).toBe('true')
		expect(contents()[1].getAttribute('hidden')).toBe('')

		value('b')
		expect(triggers()[1].getAttribute('aria-selected')).toBe('true')
		expect(contents()[1].getAttribute('hidden')).toBeNull()
	})

	it('calls onValueChange with the selected tab value string', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		const triggers = container.querySelectorAll('[data-part="trigger"]')
		await user.click(triggers[1])

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe('b')
	})

	describe('asChild', ()=> {
		it('renders only the child element — no button wrapper', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Tabs.Root, { defaultValue: 'account' }, [
				h(Tabs.List, null, [
					h(Tabs.Trigger, { value: 'account', asChild: true }, h('a', { href: '#account' }, 'Account')),
					h(Tabs.Trigger, { value: 'password', asChild: true }, h('a', { href: '#password' }, 'Password')),
				]),
				h(Tabs.Content, { value: 'account' }, 'Account content'),
				h(Tabs.Content, { value: 'password' }, 'Password content'),
			]))

			expect(container.querySelector('button')).toBeNull()
			expect(container.querySelectorAll('a').length).toBe(2)
		})

		it('child receives data-part and aria-selected from the trigger part', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Tabs.Root, { defaultValue: 'account' }, [
				h(Tabs.List, null, h(Tabs.Trigger, { value: 'account', asChild: true }, h('a', { href: '#account' }, 'Account'))),
				h(Tabs.Content, { value: 'account' }, 'Account content'),
			]))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('trigger')
			expect(anchor.getAttribute('aria-selected')).toBe('true')
		})

		it('merges event handlers — tab switches and child onClick fires', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			const childSpy = vi.fn()

			renderApp(container, h(Tabs.Root, { defaultValue: 'account' }, [
				h(Tabs.List, null, [
					h(Tabs.Trigger, { value: 'account', asChild: true }, h('a', { href: '#account' }, 'Account')),
					h(Tabs.Trigger, { value: 'password', asChild: true }, h('a', { href: '#password', onClick: childSpy }, 'Password')),
				]),
				h(Tabs.Content, { value: 'account' }, 'Account content'),
				h(Tabs.Content, { value: 'password' }, 'Password content'),
			]))

			const anchors = container.querySelectorAll('a')
			await user.click(anchors[1])

			expect(childSpy).toHaveBeenCalledOnce()
			expect(anchors[1].getAttribute('aria-selected')).toBe('true')
		})
	})

	describe('lazyMount and unmountOnExit', ()=> {
		const renderLazyTabs = (props = {})=> {
			const container = document.createElement('div')
			renderApp(container, h(Tabs.Root, {
				defaultValue: 'a',
				activationMode: 'manual',
				...props,
				children: [
					h(Tabs.List, null, h(Tabs.Trigger, { value: 'a' }, 'Tab A'), h(Tabs.Trigger, { value: 'b' }, 'Tab B')),
					h(Tabs.Content, { value: 'a' }, 'Content A'),
					h(Tabs.Content, { value: 'b' }, 'Content B'),
				],
			}))
			return container
		}

		it('default: all content panels are in the DOM from the start', ()=> {
			const container = renderLazyTabs()
			expect(container.querySelectorAll('[data-part="content"]').length).toBe(2)
		})

		it('lazyMount: inactive tab content is absent until first selected', async()=> {
			const user = userEvent.setup()
			const container = renderLazyTabs({ lazyMount: true })
			const contents = ()=> container.querySelectorAll('[data-part="content"]')

			expect(contents().length).toBe(1)
			expect(contents()[0].textContent).toBe('Content A')

			await user.click(container.querySelectorAll('[data-part="trigger"]')[1])
			expect(contents().length).toBe(2)
		})

		it('lazyMount + unmountOnExit: content is removed after switching away', async()=> {
			const user = userEvent.setup()
			const container = renderLazyTabs({ lazyMount: true, unmountOnExit: true })
			const triggers = ()=> container.querySelectorAll('[data-part="trigger"]')
			const contents = ()=> container.querySelectorAll('[data-part="content"]')

			expect(contents().length).toBe(1)

			await user.click(triggers()[1])
			expect(contents().length).toBe(1)
			expect(contents()[0].textContent).toBe('Content B')

			await user.click(triggers()[0])
			expect(contents().length).toBe(1)
			expect(contents()[0].textContent).toBe('Content A')
		})
	})
})

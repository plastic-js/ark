// @vitest-environment jsdom

import {
	afterEach, describe, expect, it, vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Accordion } from '../index.js'
import { createSignal, h, renderApp } from '../../../runtime.js'
import { ComponentUnderTest } from './basic.jsx'

afterEach(()=> {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic Accordion', ()=> {
	it('opens one item at a time in single mode', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)

		renderApp(container, h(Accordion.Root, {
			defaultValue: 'a',
			children: [
				h(Accordion.Item, {
					value: 'a',
					children: [
						h(Accordion.Trigger, null, 'First'),
						h(Accordion.Content, null, 'Alpha'),
					],
				}),
				h(Accordion.Item, {
					value: 'b',
					children: [
						h(Accordion.Trigger, null, 'Second'),
						h(Accordion.Content, null, 'Beta'),
					],
				}),
			],
		}))

		const triggers = container.querySelectorAll('[data-part="item-trigger"]')
		const contents = container.querySelectorAll('[data-part="item-content"]')

		expect(triggers[0].getAttribute('data-state')).toBe('open')
		expect(contents[0].hidden).toBe(false)
		expect(contents[1].hidden).toBe(true)

		await user.click(triggers[1])
		expect(triggers[0].getAttribute('data-state')).toBe('closed')
		expect(triggers[1].getAttribute('data-state')).toBe('open')
		expect(contents[1].hidden).toBe(false)
	})

	it('maps controlled single-value changes to the legacy callback shape', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('a')

		renderApp(container, h(Accordion.Root, {
			value,
			onValueChange: value,
			children: [
				h(Accordion.Item, {
					value: 'a',
					children: [
						h(Accordion.Trigger, null, 'First'),
						h(Accordion.Content, null, 'Alpha'),
					],
				}),
				h(Accordion.Item, {
					value: 'b',
					children: [
						h(Accordion.Trigger, null, 'Second'),
						h(Accordion.Content, null, 'Beta'),
					],
				}),
			],
		}))

		const triggers = container.querySelectorAll('[data-part="item-trigger"]')
		await user.click(triggers[1])
		expect(value()).toBe('b')
		expect(container.querySelectorAll('[data-part="item-content"]')[1].hidden).toBe(false)
	})

	it('calls onValueChange with the newly selected value string', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onValueChange: spy }))

		const triggers = container.querySelectorAll('[data-part="item-trigger"]')
		await user.click(triggers[1])

		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe('b')
	})

	it('uncontrolled: defaultValue sets initial state; machine owns subsequent updates', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		renderApp(container, h(ComponentUnderTest, {}))

		const triggers = container.querySelectorAll('[data-part="item-trigger"]')
		const contents = container.querySelectorAll('[data-part="item-content"]')

		expect(triggers[0].getAttribute('data-state')).toBe('open')
		expect(contents[0].hidden).toBe(false)

		await user.click(triggers[1])
		expect(triggers[1].getAttribute('data-state')).toBe('open')
		expect(contents[1].hidden).toBe(false)
	})

	it('controlled: signal as value prevents updates; callback fires; external update applies', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const value = createSignal('a')
		const spy = vi.fn()

		renderApp(container, h(Accordion.Root, {
			value,
			onValueChange: spy,
			children: [
				h(Accordion.Item, {
					value: 'a',
					children: [
						h(Accordion.Trigger, null, 'First'),
						h(Accordion.Content, null, 'Alpha'),
					],
				}),
				h(Accordion.Item, {
					value: 'b',
					children: [
						h(Accordion.Trigger, null, 'Second'),
						h(Accordion.Content, null, 'Beta'),
					],
				}),
			],
		}))

		const triggers = container.querySelectorAll('[data-part="item-trigger"]')
		const contents = container.querySelectorAll('[data-part="item-content"]')

		await user.click(triggers[1])
		expect(spy).toHaveBeenCalledOnce()
		expect(spy.mock.calls[0][0]).toBe('b')
		expect(triggers[0].getAttribute('data-state')).toBe('open')
		expect(contents[1].hidden).toBe(true)

		value('b')
		expect(triggers[1].getAttribute('data-state')).toBe('open')
		expect(contents[1].hidden).toBe(false)
	})

	it('calls onFocusChange with the focused trigger value', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const spy = vi.fn()

		renderApp(container, h(ComponentUnderTest, { onFocusChange: spy }))

		const triggers = container.querySelectorAll('[data-part="item-trigger"]')
		await user.click(triggers[0])

		expect(spy).toHaveBeenCalled()
		expect(spy.mock.calls[0][0]).toBe('a')
	})

	describe('asChild', ()=> {
		it('renders only the child element — no button wrapper', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Accordion.Root, {
				defaultValue: ['a'],
				children: h(Accordion.Item, { value: 'a' }, [
					h(Accordion.Trigger, { asChild: true }, h('a', { href: '#' }, 'First')),
					h(Accordion.Content, null, 'Alpha'),
				]),
			}))

			expect(container.querySelector('button')).toBeNull()
			expect(container.querySelector('a')).not.toBeNull()
		})

		it('child receives data-part and aria attrs from the part', ()=> {
			const container = document.createElement('div')

			renderApp(container, h(Accordion.Root, {
				defaultValue: ['a'],
				children: h(Accordion.Item, { value: 'a' }, [
					h(Accordion.Trigger, { asChild: true }, h('a', { href: '#' }, 'First')),
					h(Accordion.Content, null, 'Alpha'),
				]),
			}))

			const anchor = container.querySelector('a')
			expect(anchor.getAttribute('data-part')).toBe('item-trigger')
			expect(anchor.getAttribute('aria-expanded')).toBe('true')
		})

		it('merges event handlers — both part toggle and child onClick fire', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			const childSpy = vi.fn()

			renderApp(container, h(Accordion.Root, {
				children: h(Accordion.Item, { value: 'a' }, [
					h(Accordion.Trigger, { asChild: true }, h('a', { href: '#', onClick: childSpy }, 'First')),
					h(Accordion.Content, null, 'Alpha'),
				]),
			}))

			const anchor = container.querySelector('a')
			// zag's machine toggles only after the trigger gains focus; anchors don't auto-focus on click in jsdom
			anchor.focus()
			await user.click(anchor)

			expect(childSpy).toHaveBeenCalledOnce()
			expect(anchor.getAttribute('aria-expanded')).toBe('true')
		})
	})

	describe('lazyMount and unmountOnExit', ()=> {
		const renderAccordion = (props = {})=> {
			const container = document.createElement('div')
			document.body.append(container)
			renderApp(container, h(Accordion.Root, {
				defaultValue: 'a',
				...props,
				children: [
					h(Accordion.Item, { value: 'a' }, h(Accordion.Trigger, null, 'First'), h(Accordion.Content, null, 'Alpha')),
					h(Accordion.Item, { value: 'b' }, h(Accordion.Trigger, null, 'Second'), h(Accordion.Content, null, 'Beta')),
				],
			}))
			return container
		}

		it('default: all content panels are in the DOM from the start', ()=> {
			const container = renderAccordion()
			expect(container.querySelectorAll('[data-part="item-content"]').length).toBe(2)
		})

		it('lazyMount: closed item content is absent until first opened', async()=> {
			const user = userEvent.setup()
			const container = renderAccordion({ lazyMount: true })
			const contents = ()=> container.querySelectorAll('[data-part="item-content"]')

			expect(contents().length).toBe(1)
			expect(contents()[0].textContent).toBe('Alpha')

			await user.click(container.querySelectorAll('[data-part="item-trigger"]')[1])
			expect(contents().length).toBe(2)
		})

		it('lazyMount + unmountOnExit: content is removed from DOM after closing', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)
			renderApp(container, h(Accordion.Root, {
				defaultValue: 'a',
				collapsible: true,
				lazyMount: true,
				unmountOnExit: true,
				children: [
					h(Accordion.Item, { value: 'a' }, h(Accordion.Trigger, null, 'First'), h(Accordion.Content, null, 'Alpha')),
					h(Accordion.Item, { value: 'b' }, h(Accordion.Trigger, null, 'Second'), h(Accordion.Content, null, 'Beta')),
				],
			}))

			const triggers = container.querySelectorAll('[data-part="item-trigger"]')
			const contents = ()=> container.querySelectorAll('[data-part="item-content"]')

			expect(contents().length).toBe(1)
			expect(contents()[0].textContent).toBe('Alpha')

			await user.click(triggers[0])
			await new Promise(r=> setTimeout(r, 50))
			expect(contents().length).toBe(0)
		})
	})

	describe('keyboard navigation', ()=> {
		it('ArrowDown moves focus to next trigger', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Accordion.Root, {
				defaultValue: 'a',
				children: [
					h(Accordion.Item, {
						value: 'a',
						children: [
							h(Accordion.Trigger, null, 'First'),
							h(Accordion.Content, null, 'Alpha'),
						],
					}),
					h(Accordion.Item, {
						value: 'b',
						children: [
							h(Accordion.Trigger, null, 'Second'),
							h(Accordion.Content, null, 'Beta'),
						],
					}),
					h(Accordion.Item, {
						value: 'c',
						children: [
							h(Accordion.Trigger, null, 'Third'),
							h(Accordion.Content, null, 'Gamma'),
						],
					}),
				],
			}))

			const triggers = container.querySelectorAll('[data-part="item-trigger"]')
			triggers[0].focus()
			await user.keyboard('[ArrowDown]')

			expect(document.activeElement).toBe(triggers[1])
		})

		it('ArrowUp moves focus to previous trigger', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Accordion.Root, {
				defaultValue: 'a',
				children: [
					h(Accordion.Item, {
						value: 'a',
						children: [
							h(Accordion.Trigger, null, 'First'),
							h(Accordion.Content, null, 'Alpha'),
						],
					}),
					h(Accordion.Item, {
						value: 'b',
						children: [
							h(Accordion.Trigger, null, 'Second'),
							h(Accordion.Content, null, 'Beta'),
						],
					}),
					h(Accordion.Item, {
						value: 'c',
						children: [
							h(Accordion.Trigger, null, 'Third'),
							h(Accordion.Content, null, 'Gamma'),
						],
					}),
				],
			}))

			const triggers = container.querySelectorAll('[data-part="item-trigger"]')
			triggers[2].focus()
			await user.keyboard('[ArrowUp]')

			expect(document.activeElement).toBe(triggers[1])
		})

		it('Home moves focus to first trigger', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Accordion.Root, {
				defaultValue: 'a',
				children: [
					h(Accordion.Item, {
						value: 'a',
						children: [
							h(Accordion.Trigger, null, 'First'),
							h(Accordion.Content, null, 'Alpha'),
						],
					}),
					h(Accordion.Item, {
						value: 'b',
						children: [
							h(Accordion.Trigger, null, 'Second'),
							h(Accordion.Content, null, 'Beta'),
						],
					}),
					h(Accordion.Item, {
						value: 'c',
						children: [
							h(Accordion.Trigger, null, 'Third'),
							h(Accordion.Content, null, 'Gamma'),
						],
					}),
				],
			}))

			const triggers = container.querySelectorAll('[data-part="item-trigger"]')
			triggers[2].focus()
			await user.keyboard('[Home]')

			expect(document.activeElement).toBe(triggers[0])
		})

		it('End moves focus to last trigger', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Accordion.Root, {
				defaultValue: 'a',
				children: [
					h(Accordion.Item, {
						value: 'a',
						children: [
							h(Accordion.Trigger, null, 'First'),
							h(Accordion.Content, null, 'Alpha'),
						],
					}),
					h(Accordion.Item, {
						value: 'b',
						children: [
							h(Accordion.Trigger, null, 'Second'),
							h(Accordion.Content, null, 'Beta'),
						],
					}),
					h(Accordion.Item, {
						value: 'c',
						children: [
							h(Accordion.Trigger, null, 'Third'),
							h(Accordion.Content, null, 'Gamma'),
						],
					}),
				],
			}))

			const triggers = container.querySelectorAll('[data-part="item-trigger"]')
			triggers[0].focus()
			await user.keyboard('[End]')

			expect(document.activeElement).toBe(triggers[2])
		})

		it('Space toggles item open/close', async()=> {
			const user = userEvent.setup()
			const container = document.createElement('div')
			document.body.append(container)

			renderApp(container, h(Accordion.Root, {
				defaultValue: 'a',
				collapsible: true,
				children: [
					h(Accordion.Item, {
						value: 'a',
						children: [
							h(Accordion.Trigger, null, 'First'),
							h(Accordion.Content, null, 'Alpha'),
						],
					}),
				],
			}))

			const trigger = container.querySelector('[data-part="item-trigger"]')
			const content = container.querySelector('[data-part="item-content"]')

			trigger.focus()
			expect(content.hidden).toBe(false)

			await user.keyboard('[Space]')
			expect(content.hidden).toBe(true)

			await user.keyboard('[Space]')
			expect(content.hidden).toBe(false)
		})
	})
})

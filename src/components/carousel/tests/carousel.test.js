// @vitest-environment jsdom

import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { Carousel } from '../index.js'
import {
	createSignal,
	h,
	renderApp,
} from '../../../runtime.js'

afterEach(()=> {
	document.body.innerHTML = ''
})

const flushCarousel = ()=> new Promise((resolve)=> {
	requestAnimationFrame(()=> {
		requestAnimationFrame(resolve)
	})
})

const defineNumberProp = (target, key, initialValue)=> {
	let value = initialValue
	Object.defineProperty(target, key, {
		configurable: true,
		get: ()=> value,
		set: (nextValue)=> {
			value = nextValue
		},
	})
}

const createRect = (left, width = 100, height = 40)=> ({
	x: left,
	y: 0,
	left,
	top: 0,
	right: left + width,
	bottom: height,
	width,
	height,
	toJSON(){
		return this
	},
})

const mockCarouselLayout = (container)=> {
	const itemGroup = container.querySelector('[data-part="item-group"]')
	const items = [...container.querySelectorAll('[data-part="item"]')]

	defineNumberProp(itemGroup, 'offsetWidth', 100)
	defineNumberProp(itemGroup, 'offsetHeight', 40)
	defineNumberProp(itemGroup, 'scrollWidth', items.length * 100)
	defineNumberProp(itemGroup, 'scrollHeight', 40)
	defineNumberProp(itemGroup, 'scrollLeft', 0)
	defineNumberProp(itemGroup, 'scrollTop', 0)
	itemGroup.getBoundingClientRect = ()=> createRect(0)

	items.forEach((item, index)=> {
		defineNumberProp(item, 'offsetWidth', 100)
		defineNumberProp(item, 'offsetHeight', 40)
		item.getBoundingClientRect = ()=> createRect(index * 100 - itemGroup.scrollLeft)
	})
}

describe('@ark-ui/plastic Carousel', ()=> {
	it('moves between slides with triggers and root keyboard shortcuts', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const onIndexChange = vi.fn()

		renderApp(container, h(Carousel.Root, {
			slideCount: 3,
			onIndexChange,
			children: [
				h(Carousel.PrevTrigger, null, 'Prev'),
				h(Carousel.ItemGroup, null, [
					h(Carousel.Item, { index: 0 }, 'One'),
					h(Carousel.Item, { index: 1 }, 'Two'),
					h(Carousel.Item, { index: 2 }, 'Three'),
				]),
				h(Carousel.NextTrigger, null, 'Next'),
			],
		}))
		mockCarouselLayout(container)

		const root = container.querySelector('[data-part="root"]')
		const prevTrigger = container.querySelector('[data-part="prev-trigger"]')
		const nextTrigger = container.querySelector('[data-part="next-trigger"]')

		await flushCarousel()
		expect(root.dataset.index).toBe('0')
		expect(prevTrigger.disabled).toBe(true)
		await user.click(container.querySelector('[data-part="next-trigger"]'))
		await flushCarousel()
		expect(root.dataset.index).toBe('1')
		expect(prevTrigger.disabled).toBe(false)
		expect(onIndexChange).toHaveBeenCalledWith(1)

		root.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'End' }))
		await flushCarousel()
		expect(root.dataset.index).toBe('2')
		expect(nextTrigger.disabled).toBe(true)
		expect(onIndexChange).toHaveBeenCalledWith(2)
	})

	it('supports legacy controlled index props through the zag machine', async()=> {
		const user = userEvent.setup()
		const container = document.createElement('div')
		document.body.append(container)
		const index = createSignal(1)
		const onIndexChange = vi.fn()

		renderApp(container, h(Carousel.Root, {
			slideCount: 3,
			index,
			onIndexChange,
			loop: false,
			children: [
				h(Carousel.PrevTrigger, null, 'Prev'),
				h(Carousel.ItemGroup, null, [
					h(Carousel.Item, { index: 0 }, 'One'),
					h(Carousel.Item, { index: 1 }, 'Two'),
					h(Carousel.Item, { index: 2 }, 'Three'),
				]),
				h(Carousel.NextTrigger, null, 'Next'),
			],
		}))
		mockCarouselLayout(container)

		const root = container.querySelector('[data-part="root"]')
		const prevTrigger = container.querySelector('[data-part="prev-trigger"]')
		const nextTrigger = container.querySelector('[data-part="next-trigger"]')

		await flushCarousel()
		expect(root.getAttribute('aria-roledescription')).toBe('carousel')
		expect(root.dataset.index).toBe('1')
		expect(prevTrigger.disabled).toBe(false)
		expect(prevTrigger.getAttribute('aria-controls')).toBe(nextTrigger.getAttribute('aria-controls'))

		await user.click(nextTrigger)
		await flushCarousel()
		expect(onIndexChange).toHaveBeenCalledWith(2)
		expect(root.dataset.index).toBe('1')

		index(2)
		await flushCarousel()
		expect(root.dataset.index).toBe('2')
		expect(nextTrigger.disabled).toBe(true)
		expect(nextTrigger.getAttribute('aria-controls')).toBe(prevTrigger.getAttribute('aria-controls'))
	})
})

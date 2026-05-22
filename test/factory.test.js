// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { ark, mergeProps } from '../src/components/factory.js'
import { createAnatomy } from '../src/components/anatomy.js'
import { ark as arkFromIndex, createAnatomy as createAnatomyFromIndex, createContext } from '../src/index.js'
import {
	createDomId,
	createSplitProps,
	mergeRefs,
	runIfFn,
} from '../src/utils/index.js'
import { h, renderApp } from '../src/runtime.js'

afterEach(() => {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic factory', () => {
	it('ark.div is a function', () => {
		expect(typeof ark.div).toBe('function')
	})

	it('ark.button is a function', () => {
		expect(typeof ark.button).toBe('function')
	})

	it('ark proxy returns same cached instance for the same tag', () => {
		expect(ark.span).toBe(ark.span)
	})

	it('ark.div renders a native div element', () => {
		const el = ark.div({})
		expect(el).toBeInstanceOf(HTMLDivElement)
	})

	it('ark.button renders a native button element', () => {
		const el = ark.button({})
		expect(el).toBeInstanceOf(HTMLButtonElement)
	})

	it('passes class prop to the rendered element', () => {
		const el = ark.div({ class: 'foo bar' })
		expect(el.classList.contains('foo')).toBe(true)
		expect(el.classList.contains('bar')).toBe(true)
	})

	it('passes data attributes to the rendered element', () => {
		const el = ark.div({ 'data-scope': 'accordion', 'data-part': 'root' })
		expect(el.dataset.scope).toBe('accordion')
		expect(el.dataset.part).toBe('root')
	})

	it('asChild calls the render prop with a propsFn instead of rendering a native element', () => {
		let receivedPropsFn = null
		ark.div({
			class: 'parent',
			asChild: (propsFn) => {
				receivedPropsFn = propsFn
				return null
			},
		})
		expect(typeof receivedPropsFn).toBe('function')
	})

	it('propsFn from asChild merges parent class with child class', () => {
		let mergedProps = null
		ark.div({
			class: 'parent',
			asChild: (propsFn) => {
				mergedProps = propsFn({ class: 'child' })
				return null
			},
		})
		expect(mergedProps.class).toBe('parent child')
	})

	it('propsFn from asChild: parent and child onClick both fire in reverse source order (matches @zag-js/solid)', () => {
		const calls = []
		ark.div({
			onClick: () => calls.push('parent'),
			asChild: (propsFn) => {
				const merged = propsFn({ onClick: () => calls.push('child') })
				merged.onClick()
				return null
			},
		})
		expect(calls).toEqual(['child', 'parent'])
	})

	it('propsFn from asChild lets child override plain props', () => {
		let mergedProps = null
		ark.div({
			id: 'parent',
			'data-testid': 'parent',
			asChild: (propsFn) => {
				mergedProps = propsFn({ id: 'child' })
				return null
			},
		})
		expect(mergedProps.id).toBe('child')
		expect(mergedProps['data-testid']).toBe('parent')
	})

	it('propsFn from asChild shallow-merges style objects', () => {
		let mergedProps = null
		ark.div({
			style: { color: 'red' },
			asChild: (propsFn) => {
				mergedProps = propsFn({ style: { fontWeight: 'bold' } })
				return null
			},
		})
		expect(mergedProps.style).toEqual({ color: 'red', fontWeight: 'bold' })
	})
})

describe('@ark-ui/plastic mergeProps', () => {
	it('merges plain props — override wins', () => {
		const result = mergeProps({ id: 'a' }, { id: 'b' })
		expect(result.id).toBe('b')
	})

	it('joins class strings', () => {
		const result = mergeProps({ class: 'a' }, { class: 'b' })
		expect(result.class).toBe('a b')
	})

	it('cross-merges class and className aliases', () => {
		const result = mergeProps({ class: 'a' }, { className: 'b' })
		expect(result.class).toBe('a b')
		expect(result.className).toBe('a b')
		expect(Object.assign({}, result)).toEqual({ className: 'a b' })
	})

	it('preserves className when provided via shared mergeProps', () => {
		const result = mergeProps({ className: 'a' }, { className: 'b' })
		expect(result.className).toBe('a b')
		expect(result.class).toBe('a b')
	})

	it('shallow-merges style objects', () => {
		const result = mergeProps({ style: { color: 'red' } }, { style: { fontWeight: 'bold' } })
		expect(result.style).toEqual({ color: 'red', fontWeight: 'bold' })
	})

	it('keeps thunk-valued class and style lazy while merging all sources', () => {
		const result = mergeProps(
			{ class: 'base', style: { color: 'red' } },
			{ class: () => 'active', style: () => ({ fontWeight: 'bold' }) },
		)

		expect(typeof result.class).toBe('function')
		expect(typeof result.className).toBe('function')
		expect(typeof result.style).toBe('function')
		expect(result.class()).toBe('base active')
		expect(result.className()).toBe('base active')
		expect(result.style()).toEqual({ color: 'red', fontWeight: 'bold' })
	})

	it('onClick handlers chain in reverse source order (matches @zag-js/solid)', () => {
		const log = []
		const merged = mergeProps({ onClick: () => log.push(1) }, { onClick: () => log.push(2) })
		merged.onClick()
		expect(log).toEqual([2, 1])
	})

	it('ref last-wins (refs are not event handlers; no chaining)', () => {
		const refLog = []
		const merged = mergeProps(
			{ ref: (node) => refLog.push(['parent', node]) },
			{ ref: (node) => refLog.push(['child', node]) },
		)
		const node = document.createElement('div')
		merged.ref(node)
		expect(refLog).toEqual([['child', node]])
	})
})

describe('@ark-ui/plastic utilities', () => {
	it('createSplitProps picks requested props and leaves the rest', () => {
		const splitProps = createSplitProps(['id', 'children'])
		const [localProps, elementProps] = splitProps({
			id: 'box',
			children: 'hello',
			class: 'demo',
		})

		expect(localProps).toEqual({ id: 'box', children: 'hello' })
		expect(elementProps).toEqual({ class: 'demo' })
	})

	it('runIfFn resolves functions and plain values', () => {
		expect(runIfFn((value) => `${value}-root`, 'box')).toBe('box-root')
		expect(runIfFn('box-root', 'ignored')).toBe('box-root')
	})

	it('createDomId joins non-empty parts with Ark-style separators', () => {
		expect(createDomId('accordion', 'trigger')).toBe('accordion--trigger')
		expect(createDomId('accordion', null, 'item')).toBe('accordion--item')
	})

	it('mergeRefs assigns every passed ref', () => {
		const functionLog = []
		const objectRef = { current: null }
		const node = document.createElement('div')
		const ref = mergeRefs(
			(value) => functionLog.push(value),
			objectRef,
		)

		ref(node)
		expect(functionLog).toEqual([node])
		expect(objectRef.current).toBe(node)
	})

	it('createContext throws a descriptive strict-mode error when missing a provider', () => {
		const [, useDemoContext] = createContext({
			hookName: 'useDemoContext',
			providerName: '<DemoProvider />',
		})
		const Consumer = () => {
			useDemoContext()
			return h('span', null, 'demo')
		}

		expect(() => renderApp(document.createElement('div'), h(Consumer))).toThrow(
			'useDemoContext returned `undefined`. Seems you forgot to wrap component within <DemoProvider />',
		)
	})

	it('createContext returns the default value when provided', () => {
		const [, useDemoContext] = createContext({
			defaultValue: 'fallback',
		})
		const Consumer = () => h('span', null, useDemoContext())
		const container = document.createElement('div')

		renderApp(container, h(Consumer))
		expect(container.textContent).toBe('fallback')
	})
})

describe('@ark-ui/plastic createAnatomy', () => {
	it('returns an anatomy object with parts(), build(), and keys()', () => {
		const anatomy = createAnatomy('accordion')
		expect(typeof anatomy.parts).toBe('function')
		expect(typeof anatomy.build).toBe('function')
		expect(typeof anatomy.keys).toBe('function')
	})

	it('build() returns part descriptors with selector and attrs', () => {
		const parts = createAnatomy('accordion').parts('root', 'item').build()
		expect(parts.root.selector).toBe('&[data-scope="accordion"][data-part="root"], & [data-scope="accordion"][data-part="root"]')
		expect(parts.root.attrs).toEqual({ 'data-scope': 'accordion', 'data-part': 'root' })
		expect(parts.item.attrs).toEqual({ 'data-scope': 'accordion', 'data-part': 'item' })
	})

	it('keys() returns the list of part names', () => {
		const anatomy = createAnatomy('accordion').parts('root', 'item', 'trigger')
		expect(anatomy.keys()).toEqual(['root', 'item', 'trigger'])
	})
})

describe('@ark-ui/plastic package exports', () => {
	it('re-exports ark from the root index', () => {
		expect(typeof arkFromIndex.div).toBe('function')
	})

	it('re-exports createAnatomy from the root index', () => {
		expect(typeof createAnatomyFromIndex).toBe('function')
	})
})

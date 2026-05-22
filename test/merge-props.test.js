// Unit tests for the zag-plastic adapter mergeProps.
// Targets the four behaviors that diverge from plastic's own mergeProps:
//   1. onXxx handlers chained in REVERSE source order
//   2. class / className concatenated via clsx
//   3. style merged across sources, with string styles parsed first
//   4. thunk (function) sources resolved lazily

import { describe, expect, it, vi } from 'vitest'
import { mergeProps } from '@plastic-js/zag/merge-props'

describe('zag-plastic/merge-props', () => {
	describe('event handlers', () => {
		it('chains onXxx handlers in reverse source order (last source first)', () => {
			const calls = []
			const a = { onClick: () => calls.push('a') }
			const b = { onClick: () => calls.push('b') }
			const c = { onClick: () => calls.push('c') }

			mergeProps(a, b, c).onClick()

			expect(calls).toEqual(['c', 'b', 'a'])
		})

		it('forwards arguments to every chained handler', () => {
			const a = vi.fn()
			const b = vi.fn()
			const evt = { type: 'click' }

			mergeProps({ onClick: a }, { onClick: b }).onClick(evt, 42)

			expect(a).toHaveBeenCalledWith(evt, 42)
			expect(b).toHaveBeenCalledWith(evt, 42)
		})

		it('returns a single handler as-is when only one source defines it', () => {
			const fn = vi.fn()
			mergeProps({ onClick: fn }, { id: 'x' }).onClick('arg')
			expect(fn).toHaveBeenCalledWith('arg')
		})

		it('skips sources that do not define the handler', () => {
			const calls = []
			const result = mergeProps(
				{ onClick: () => calls.push('a') },
				{ id: 'x' },
				{ onClick: () => calls.push('c') },
			)
			result.onClick()
			expect(calls).toEqual(['c', 'a'])
		})

		it('handles null / undefined sources without throwing', () => {
			const fn = vi.fn()
			expect(() => mergeProps(null, { onClick: fn }, undefined).onClick()).not.toThrow()
			expect(fn).toHaveBeenCalled()
		})
	})

	describe('class / className', () => {
		it('concatenates class across sources', () => {
			const result = mergeProps({ class: 'a b' }, { class: 'c' })
			expect(result.class).toBe('a b c')
		})

		it('concatenates className across sources', () => {
			const result = mergeProps({ className: 'a' }, { className: 'b' })
			expect(result.className).toBe('a b')
		})

		it('mixes class and className from different sources', () => {
			const result = mergeProps({ class: 'a' }, { className: 'b' })
			expect(result.class).toBe('a b')
		})

		it('returns a thunk when any class source is a function (lazy)', () => {
			let dynamic = 'x'
			const result = mergeProps({ class: 'base' }, { class: () => dynamic })
			expect(typeof result.class).toBe('function')
			expect(result.class()).toBe('base x')
			dynamic = 'y'
			expect(result.class()).toBe('base y')
		})

		it('omits class when no source provides one', () => {
			const result = mergeProps({ id: 'a' }, { id: 'b' })
			expect(result.class).toBeUndefined()
		})
	})

	describe('style', () => {
		it('merges object styles across sources, later source wins per key', () => {
			const result = mergeProps(
				{ style: { color: 'red', fontSize: '12px' } },
				{ style: { color: 'blue' } },
			)
			expect(result.style).toEqual({ color: 'blue', fontSize: '12px' })
		})

		it('parses string styles before merging', () => {
			const result = mergeProps(
				{ style: 'color: red; font-size: 12px' },
				{ style: { color: 'blue' } },
			)
			expect(result.style).toEqual({ color: 'blue', 'font-size': '12px' })
		})

		it('returns a thunk when any style source is a function (lazy)', () => {
			let bg = 'white'
			const result = mergeProps(
				{ style: { color: 'red' } },
				{ style: () => ({ background: bg }) },
			)
			expect(typeof result.style).toBe('function')
			expect(result.style()).toEqual({ color: 'red', background: 'white' })
			bg = 'black'
			expect(result.style()).toEqual({ color: 'red', background: 'black' })
		})

		it('omits style when no source provides one', () => {
			const result = mergeProps({ id: 'a' }, { id: 'b' })
			expect(result.style).toBeUndefined()
		})
	})

	describe('thunk (function) sources', () => {
		it('resolves function sources lazily for handlers', () => {
			const calls = []
			let handler = () => calls.push('first')
			const result = mergeProps(() => ({ onClick: handler }), { onClick: () => calls.push('user') })

			result.onClick()
			expect(calls).toEqual(['user', 'first'])

			handler = () => calls.push('second')
			result.onClick()
			expect(calls).toEqual(['user', 'first', 'user', 'second'])
		})

		it('resolves function sources lazily for class', () => {
			let cls = 'a'
			const result = mergeProps(() => ({ class: cls }), { class: 'static' })
			expect(result.class).toBe('a static')
			cls = 'b'
			expect(result.class).toBe('b static')
		})

		it('skips null thunks safely', () => {
			const fn = vi.fn()
			expect(() => mergeProps(() => null, { onClick: fn }).onClick()).not.toThrow()
			expect(fn).toHaveBeenCalled()
		})
	})

	describe('delegation to plastic mergeProps', () => {
		it('passes through non-special keys (last source wins for plain values)', () => {
			const result = mergeProps({ id: 'a', role: 'button' }, { id: 'b' })
			expect(result.id).toBe('b')
			expect(result.role).toBe('button')
		})

		it('single source returns the inner mergeProps result directly', () => {
			const fn = vi.fn()
			const result = mergeProps({ onClick: fn, class: 'a' })
			// No reverse-chain or clsx wrapping should happen for a single source.
			result.onClick('x')
			expect(fn).toHaveBeenCalledWith('x')
			expect(result.class).toBe('a')
		})
	})
})

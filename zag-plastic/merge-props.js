// zag-js / ark-ui adapter semantics for mergeProps.
//
// Plastic's own mergeProps is Solid-compatible: for event handlers, last
// source wins (later sources fully replace earlier ones). That contract is
// what plastic users expect and is asserted by plastic's own test suite.
//
// Adapters built on top of zag-js state machines need the upstream
// (`@zag-js/solid`) semantics instead:
//
//   - `onXxx` handlers from every source must fire, in REVERSE source
//     order (last source first). For `mergeProps(() => api.getRootProps(),
//     userProps)` this means `userProps.onClick` runs before the machine
//     handler, so user code can `preventDefault()` /
//     `stopPropagation()` before the machine reacts.
//   - `class` / `className` are concatenated across all sources via `clsx`.
//   - `style` is merged across all sources; string styles
//     (`"color:red;..."`) are parsed into objects before merging, so a
//     later source's per-property value wins regardless of form.
//
// Everything else is delegated to plastic's `mergeProps` so we keep
// thunk-aware lazy resolution and the IS_MERGED_PROPS marker that
// `applyProps` checks for key tracking. The Proxy wrapper only intercepts
// `onXxx` / `class` / `className` / `style`.

import { mergeProps as plasticMergeProps } from '@plastic-js/plastic'
import clsx from 'clsx'

const isEventKey = (key)=> typeof key === 'string' && /^on[A-Z]/.test(key)
const isClassKey = (key)=> key === 'class' || key === 'className'
const isStyleKey = (key)=> key === 'style'

const resolveSource = (source)=> typeof source === 'function' ? source() : source

const collectHandlers = (sources, key)=> {
	const handlers = []
	for (const source of sources){
		const resolved = resolveSource(source)
		if (resolved == null) continue
		const value = resolved[key]
		if (typeof value === 'function') handlers.push(value)
	}
	return handlers
}

const chainHandlers = (handlers)=> (...args)=> {
	// Reverse source order to match @zag-js/solid: later sources fire first,
	// so user handlers can preventDefault/stopPropagation before machine handlers.
	for (let i = handlers.length - 1; i >= 0; i--) handlers[i](...args)
}

const hasFnValue = (sources, keys)=> {
	for (const source of sources){
		const resolved = resolveSource(source)
		if (resolved == null) continue
		for (const key of keys){
			if (typeof resolved[key] === 'function') return true
		}
	}
	return false
}

const collectClassParts = (sources)=> {
	const parts = []
	for (const source of sources){
		const resolved = resolveSource(source)
		if (resolved == null) continue
		if (resolved.class != null){
			parts.push(typeof resolved.class === 'function' ? resolved.class() : resolved.class)
		}
		if (resolved.className != null){
			parts.push(typeof resolved.className === 'function' ? resolved.className() : resolved.className)
		}
	}
	return parts
}

const mergedClass = (sources)=> {
	if (hasFnValue(sources, ['class', 'className'])){
		return ()=> {
			const parts = collectClassParts(sources)
			return parts.length ? clsx(...parts) : undefined
		}
	}
	const parts = collectClassParts(sources)
	return parts.length ? clsx(...parts) : undefined
}

const parseStyleString = (str)=> {
	const obj = {}
	for (const decl of str.split(';')){
		const idx = decl.indexOf(':')
		if (idx < 0) continue
		const key = decl.slice(0, idx).trim()
		const value = decl.slice(idx + 1).trim()
		if (key) obj[key] = value
	}
	return obj
}

const computeStyle = (sources)=> {
	let result
	for (const source of sources){
		const resolved = resolveSource(source)
		if (resolved == null) continue
		let value = resolved.style
		if (value == null) continue
		if (typeof value === 'function') value = value()
		if (typeof value === 'string') value = parseStyleString(value)
		if (result == null) result = {}
		Object.assign(result, value)
	}
	return result
}

const mergedStyle = (sources)=> {
	if (hasFnValue(sources, ['style'])) return ()=> computeStyle(sources)
	return computeStyle(sources)
}

export const mergeProps = (...sources)=> {
	const inner = plasticMergeProps(...sources)

	// Single source / fast path: nothing to chain or concatenate.
	if (sources.length < 2) return inner

	const computeSpecial = (key)=> {
		if (isEventKey(key)){
			const handlers = collectHandlers(sources, key)
			if (handlers.length === 0) return { has: false }
			if (handlers.length === 1) return { has: true, value: handlers[0] }
			return { has: true, value: chainHandlers(handlers) }
		}
		if (isClassKey(key)){
			const value = mergedClass(sources)
			return value === undefined ? { has: false } : { has: true, value }
		}
		if (isStyleKey(key)){
			const value = mergedStyle(sources)
			return value === undefined ? { has: false } : { has: true, value }
		}
		return null
	}

	return new Proxy(inner, {
		get(target, key, receiver){
			const special = computeSpecial(key)
			if (special){
				if (special.has) return special.value
				return Reflect.get(target, key, receiver)
			}
			return Reflect.get(target, key, receiver)
		},
		getOwnPropertyDescriptor(target, key){
			const special = computeSpecial(key)
			if (special){
				if (!special.has) return Reflect.getOwnPropertyDescriptor(target, key)
				return { enumerable: true, configurable: true, get: ()=> special.value }
			}
			return Reflect.getOwnPropertyDescriptor(target, key)
		},
	})
}

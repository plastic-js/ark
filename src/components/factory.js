import { applyProps, h } from '../runtime.js'
import { createSplitProps, mergeProps } from '../utils/index.js'

const splitFactoryProps = createSplitProps(['asChild', 'children'])

// Resolve a children value to a single DOM Element for asChild delegation.
// Unwraps single-item arrays produced by JSX transforms.
const resolveChildElement = (children)=> {
	const child = Array.isArray(children) ? children[0] : children
	if (!(child instanceof Element)){
		throw new Error('asChild requires a single Element child')
	}
	return child
}

/**
 * Wrap an HTML tag (or component) with asChild support.
 *
 * Boolean form — render delegation:
 *   <Part asChild><a href="x">link</a></Part>
 * The child element receives all part props (ARIA attrs, data-part, event
 * handlers) merged on top of its own. No wrapper element is introduced.
 *
 * Render-prop form (legacy):
 *   asChild={(propsFn) => <SomeChild {...propsFn({ extraProp: 1 })} />}
 * `propsFn` merges the parent's base props with anything the child passes in.
 */
const withAsProp = tag=> (props = {})=> {
	const [localProps, elementProps] = splitFactoryProps(props)

	if (localProps.asChild != null){
		if (typeof localProps.asChild === 'function'){
			const propsFn = (userProps = {})=> mergeProps(elementProps, userProps)
			return localProps.asChild(propsFn)
		}

		// Boolean asChild: delegate rendering to the single child element.
		const child = resolveChildElement(localProps.children)
		applyProps(child, elementProps)
		return child
	}

	return h(tag, elementProps, localProps.children)
}

const jsxFactory = ()=> {
	const cache = new Map()

	return new Proxy(withAsProp, {
		apply(_target, _thisArg, args){
			return withAsProp(args[0])
		},
		get(_, tag){
			if (typeof tag !== 'string'){
				return undefined
			}

			if (!cache.has(tag)){
				cache.set(tag, withAsProp(tag))
			}
			return cache.get(tag)
		},
	})
}

export const ark = jsxFactory()
export { mergeProps }

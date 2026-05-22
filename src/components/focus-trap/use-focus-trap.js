import {
	onCleanup,
	onMount,
} from '../../runtime.js'
import {
	createSplitProps,
	focusFirst,
	focusLast,
	getFocusableElements,
	mergeRefs,
	runIfFn,
} from '../../utils/index.js'
import { focusTrapAnatomy } from './focus-trap.anatomy.js'

const splitFocusTrapProps = createSplitProps([
	'disabled',
	'initialFocus',
	'fallbackFocus',
	'returnFocusOnDeactivate',
	'setReturnFocus',
	'onActivate',
	'onDeactivate',
	'rootRef',
	'asChild',
	'children',
])

const resolveNode = (value, scope)=> runIfFn(value, scope)

export const useFocusTrap = (props = {})=> {
	const [localProps, elementProps] = splitFocusTrapProps(props)
	const anatomy = focusTrapAnatomy.build()
	const refs = {
		root: { current: null },
	}
	let cleanupTrap = ()=> {}

	const disabled = ()=> Boolean(runIfFn(localProps.disabled))

	onCleanup(()=> {
		cleanupTrap()
	})

	onMount(()=> {
		const rootNode = refs.root.current
		if (!rootNode || disabled()){
			return
		}

		const ownerDocument = rootNode.ownerDocument
		const initialReturnFocus = resolveNode(localProps.setReturnFocus, rootNode) ?? ownerDocument.activeElement
		runIfFn(localProps.onActivate, rootNode)

		const initialFocus = resolveNode(localProps.initialFocus, rootNode) ?? rootNode.querySelector('[autofocus], [data-autofocus]') ?? getFocusableElements(rootNode)[0] ?? resolveNode(localProps.fallbackFocus, rootNode)

		initialFocus?.focus?.()

		const handleKeyDown = (event)=> {
			if (event.key !== 'Tab'){
				return
			}

			const focusableElements = getFocusableElements(rootNode)
			if (focusableElements.length === 0){
				event.preventDefault()
				rootNode.focus()
				return
			}

			event.preventDefault()
			const activeElement = ownerDocument.activeElement
			const currentIndex = focusableElements.indexOf(activeElement)
			const lastIndex = focusableElements.length - 1
			let nextIndex
			if (currentIndex === -1){
				nextIndex = event.shiftKey ? lastIndex : 0
			} else if (event.shiftKey){
				nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
			} else {
				nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
			}
			focusableElements[nextIndex]?.focus?.()
		}

		const handleFocusIn = (event)=> {
			const target = event.target
			if (rootNode.contains(target)){
				return
			}

			const fallback = resolveNode(localProps.fallbackFocus, rootNode)
			if (fallback){
				fallback.focus?.()
				return
			}

			focusFirst(rootNode) ?? rootNode.focus()
		}

		rootNode.addEventListener('keydown', handleKeyDown)
		ownerDocument.addEventListener('focusin', handleFocusIn)

		cleanupTrap = ()=> {
			rootNode.removeEventListener('keydown', handleKeyDown)
			ownerDocument.removeEventListener('focusin', handleFocusIn)
			runIfFn(localProps.onDeactivate, rootNode)

			if (localProps.returnFocusOnDeactivate !== false){
				initialReturnFocus?.focus?.()
			}
		}
	})

	return {
		getRootProps: ()=> ({
			...elementProps,
			ref: mergeRefs(elementProps.ref, localProps.rootRef, (value)=> {
				refs.root.current = value
			}),
			asChild: localProps.asChild,
			tabIndex: elementProps.tabIndex ?? -1,
			...anatomy.root.attrs,
			children: localProps.children,
		}),
	}
}

import {
	createEffect,
	createSignal,
} from '../../runtime.js'
import {
	createSplitProps,
	mergeProps,
} from '../../utils/index.js'
import {
	mergeEventHandlers,
	mergeRefs,
} from '../../utils/dom.js'
import { ark } from '../factory.js'
import { useDateInputContext } from './date-input-context.js'

const splitSegmentProps = createSplitProps(['segment'])

export const DateInputSegment = (props = {})=> {
	const dateInput = useDateInputContext()
	const [{ segment }, elementProps] = splitSegmentProps(props)
	const baseSegmentProps = dateInput().getSegmentProps({ segment })
	const displayText = createSignal(segment?.text ?? '')
	let element = null
	let shouldRestoreCaret = false

	createEffect(()=> {
		dateInput.version()
		dateInput.segmentsVersion()

		// Keep the visible label on a dedicated text node signal. Updating text in
		// place avoids replacing the child node while the user is editing a
		// contentEditable segment.
		displayText(segment?.text ?? '')

		if (shouldRestoreCaret && element){
			shouldRestoreCaret = false
			element.ownerDocument?.defaultView?.setTimeout(()=> {
				const activeElement = element?.ownerDocument?.activeElement
				if (!element?.isConnected || activeElement === element){
					return
				}

				if (activeElement && activeElement !== element.ownerDocument?.body && activeElement.getAttribute?.('data-part') === 'segment'){
					return
				}

				element.focus()
				element.ownerDocument?.getSelection?.()?.collapse(element)
			}, 0)
		}
	})

	const merged = mergeProps({
		...baseSegmentProps,
		onFocus: mergeEventHandlers(baseSegmentProps.onFocus, ()=> {
			const selection = element?.ownerDocument?.getSelection?.()
			const textNode = element?.firstChild
			if (!selection || !textNode){
				return
			}

			// Collapse into the text node itself so the browser keeps the caret in
			// the editable content instead of selecting the span container.
			selection.collapse(textNode, textNode.textContent?.length ?? 0)
		}),
		onBeforeInput: mergeEventHandlers(baseSegmentProps.onBeforeInput, ()=> {
			// Safari/WebKit can temporarily drop activeElement to <body> after the
			// first digit. Remember that this input came from the active segment so
			// the effect can restore focus on the next tick when needed.
			shouldRestoreCaret = true
		}),
	}, elementProps, {
		children: displayText,
		ref: mergeRefs(elementProps.ref, (value)=> {
			element = value
		}),
	})

	return ark.span(merged)
}

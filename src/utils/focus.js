const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button',
	'input',
	'select',
	'textarea',
	'[tabindex]',
	'[contenteditable="true"]',
].join(',')

const isFocusable = (element)=> {
	if (!(element instanceof HTMLElement)){
		return false
	}

	if (element.hidden || element.getAttribute('aria-hidden') === 'true'){
		return false
	}

	if ('disabled' in element && element.disabled){
		return false
	}

	return element.tabIndex >= 0
}

export const getFocusableElements = (container)=> {
	if (!(container instanceof HTMLElement || container instanceof DocumentFragment)){
		return []
	}

	return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isFocusable)
}

export const focusFirst = (container)=> {
	const element = getFocusableElements(container)[0]
	element?.focus()
	return element
}

export const focusLast = (container)=> {
	const focusableElements = getFocusableElements(container)
	const element = focusableElements[focusableElements.length - 1]
	element?.focus()
	return element
}

export const focusByOffset = (container, currentElement, offset, { loop = true } = {})=> {
	const focusableElements = getFocusableElements(container)
	if (focusableElements.length === 0){
		return undefined
	}

	const currentIndex = focusableElements.indexOf(currentElement)
	if (currentIndex === -1){
		const fallback = focusableElements[0]
		fallback?.focus()
		return fallback
	}

	let nextIndex = currentIndex + offset
	if (loop){
		nextIndex = (nextIndex + focusableElements.length) % focusableElements.length
	} else if (nextIndex < 0 || nextIndex >= focusableElements.length){
		return focusableElements[currentIndex]
	}

	const nextElement = focusableElements[nextIndex]
	nextElement?.focus()
	return nextElement
}

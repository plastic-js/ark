const isRefObject = ref=> ref != null && typeof ref === 'object' && 'current' in ref

export const createDomId = (...parts)=> parts.filter(part=> part != null && part !== '').join('--')

export const isEventKey = (key = '')=> typeof key === 'string' && key.startsWith('on') && key.length > 2

export const callAll = (...fns)=> (...args)=> {
	fns.forEach((fn)=> {
		if (typeof fn === 'function'){
			fn(...args)
		}
	})
}

export const mergeEventHandlers = (...handlers)=> {
	const validHandlers = handlers.filter(handler=> typeof handler === 'function')
	if (validHandlers.length === 0){
		return undefined
	}

	return callAll(...validHandlers)
}

export const assignRef = (ref, value)=> {
	if (typeof ref === 'function'){
		ref(value)
		return
	}

	if (isRefObject(ref)){
		ref.current = value
	}
}

export const mergeRefs = (...refs)=> {
	const validRefs = refs.filter(Boolean)
	if (validRefs.length === 0){
		return undefined
	}

	return (value)=> {
		validRefs.forEach((ref)=> {
			assignRef(ref, value)
		})
	}
}

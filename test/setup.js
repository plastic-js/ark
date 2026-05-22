class ResizeObserver{

	observe(){}

	unobserve(){}

	disconnect(){}

}

class IntersectionObserver{

	constructor(callback){
		this.callback = callback
	}

	observe(target){
		this.callback?.([
			{
				target,
				isIntersecting: Number(target?.dataset?.index ?? -1) === 0,
			},
		])
	}

	unobserve(){}

	disconnect(){}

}

const escapeCss = value=> String(value).replace(/[^a-zA-Z0-9_-]/g, match=> `\\${match}`)

if (typeof globalThis.ResizeObserver !== 'function'){
	globalThis.ResizeObserver = ResizeObserver
}

if (typeof globalThis.IntersectionObserver !== 'function'){
	globalThis.IntersectionObserver = IntersectionObserver
}

if (typeof window !== 'undefined' && typeof window.ResizeObserver !== 'function'){
	window.ResizeObserver = globalThis.ResizeObserver
}

if (typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'function'){
	window.IntersectionObserver = globalThis.IntersectionObserver
}

if (typeof HTMLElement !== 'undefined' && typeof HTMLElement.prototype.scrollTo !== 'function'){
	HTMLElement.prototype.scrollTo = function scrollTo(optionsOrX, maybeY){
		if (typeof optionsOrX === 'object' && optionsOrX !== null){
			if (typeof optionsOrX.left === 'number'){
				this.scrollLeft = optionsOrX.left
			}
			if (typeof optionsOrX.top === 'number'){
				this.scrollTop = optionsOrX.top
			}
		} else {
			if (typeof optionsOrX === 'number'){
				this.scrollLeft = optionsOrX
			}
			if (typeof maybeY === 'number'){
				this.scrollTop = maybeY
			}
		}

		this.dispatchEvent(new Event('scroll'))
	}
}

if (typeof globalThis.CSS !== 'object' || globalThis.CSS === null){
	globalThis.CSS = {}
}

if (typeof globalThis.CSS.escape !== 'function'){
	globalThis.CSS.escape = escapeCss
}

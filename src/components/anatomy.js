/**
 * Minimal anatomy helper. Creates a named anatomy with a set of part names.
 *
 * Usage:
 *   const accordionAnatomy = createAnatomy('accordion').parts('root', 'item', 'trigger', 'content')
 *   const parts = accordionAnatomy.build()
 *   // parts.root.attrs  → { 'data-scope': 'accordion', 'data-part': 'root' }
 *   // parts.root.selector → '[data-scope="accordion"][data-part="root"]'
 */
const toDataPart = part=> part.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export const createAnatomy = (name, parts = [])=> {
	const build = ()=> {
		const result = {}
		parts.forEach((part)=> {
			const dataPart = toDataPart(part)
			result[part] = {
				selector: `&[data-scope="${name}"][data-part="${dataPart}"], & [data-scope="${name}"][data-part="${dataPart}"]`,
				attrs: { 'data-scope': name, 'data-part': dataPart },
			}
		})
		return result
	}

	return {
		parts: (...extraParts)=> createAnatomy(name, [...parts, ...extraParts]),
		build,
		keys: ()=> [...parts],
	}
}

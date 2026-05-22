import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createAnatomy } from '@zag-js/anatomy'

const testDirectory = path.dirname(new URL(import.meta.url).pathname)
const plasticComponentsRoot = path.resolve(testDirectory, '../src/components')
const solidComponentsRoot = path.resolve(testDirectory, '../ark-solid/src/components')
const plasticAnatomyModules = import.meta.glob('../src/components/*/*.anatomy.js', { eager: true })

const plasticOnlyExtensions = {
	'color-picker': ['hiddenInput', 'input', 'valueSwatch'],
	drawer: ['indent', 'indentBackground'],
	menu: ['checkboxItem', 'radioItem', 'radioItemGroup'],
	'rating-group': ['hiddenInput', 'itemText'],
	slider: ['hiddenInput'],
	toast: ['trigger', 'viewport'],
	tour: ['trigger'],
}

const toCamelCase = value=> value.replace(/-([a-z])/g, (_, char)=> char.toUpperCase())
const buildAnatomyExportName = componentName=> `${toCamelCase(componentName)}Anatomy`

const listComponentDirectories = componentRoot=> fs.readdirSync(componentRoot, { withFileTypes: true })
	.filter(entry=> entry.isDirectory())
	.map(entry=> entry.name)
	.sort()

const buildModuleKey = (packageName, componentName, extension)=> {
	if (packageName === 'plastic'){
		return `../src/components/${componentName}/${componentName}.anatomy.${extension}`
	}

	return path.join(solidComponentsRoot, componentName, `${componentName}.anatomy.${extension}`)
}

const hasAnatomyFile = (packageName, componentName, extension)=> {
	const moduleKey = buildModuleKey(packageName, componentName, extension)
	const modules = packageName === 'plastic' ? plasticAnatomyModules : null
	if (packageName === 'solid'){
		return fs.existsSync(moduleKey)
	}
	return moduleKey in modules
}

const getSharedComponents = ()=> {
	const plasticComponents = listComponentDirectories(plasticComponentsRoot)
	const solidComponents = new Set(listComponentDirectories(solidComponentsRoot))

	return plasticComponents.filter(componentName=> {
		return solidComponents.has(componentName)
			&& hasAnatomyFile('plastic', componentName, 'js')
			&& hasAnatomyFile('solid', componentName, 'ts')
	})
}

const extractQuotedValues = value=> [...value.matchAll(/'([^']+)'/g)].map(match=> match[1])

const buildSolidAnatomy = async componentName=> {
	const anatomyPath = buildModuleKey('solid', componentName, 'ts')
	const anatomySource = fs.readFileSync(anatomyPath, 'utf8')
	const zagImport = anatomySource.match(/from '(@zag-js\/[^']+)'/)

	if (anatomySource.includes('export { anatomy as ')){
		const zagModule = await import(zagImport[1])
		return zagModule.anatomy
	}

	if (anatomySource.includes('anatomy.extendWith(')){
		const zagModule = await import(zagImport[1])
		const extendArgs = anatomySource.match(/anatomy\.extendWith\(([^)]*)\)/s)
		return zagModule.anatomy.extendWith(...extractQuotedValues(extendArgs[1]))
	}

	if (anatomySource.includes('createAnatomy(')){
		const chainedMatch = anatomySource.match(/createAnatomy\('([^']+)'\)\.parts\(([^)]*)\)/s)
		if (chainedMatch){
			return createAnatomy(chainedMatch[1]).parts(...extractQuotedValues(chainedMatch[2]))
		}
		const inlineMatch = anatomySource.match(/createAnatomy\('([^']+)',\s*\[([^\]]*)\]\)/s)
		if (inlineMatch){
			return createAnatomy(inlineMatch[1]).parts(...extractQuotedValues(inlineMatch[2]))
		}
	}

	throw new Error(`Unsupported anatomy source format: ${anatomyPath}`)
}

const getAnatomy = async (packageName, componentName, extension)=> {
	const exportName = buildAnatomyExportName(componentName)
	if (packageName === 'solid'){
		return buildSolidAnatomy(componentName)
	}

	const moduleKey = buildModuleKey(packageName, componentName, extension)
	const anatomyModule = plasticAnatomyModules[moduleKey]
	const anatomy = anatomyModule[exportName]

	if (!anatomy){
		throw new Error(`Missing ${exportName} in ${moduleKey}`)
	}

	return anatomy
}

describe('cross-package anatomy parity', ()=> {
	const sharedComponents = getSharedComponents()

	it('covers a stable set of shared components', ()=> {
		expect(sharedComponents).toMatchInlineSnapshot(`
			[
			  "accordion",
			  "avatar",
			  "carousel",
			  "checkbox",
			  "clipboard",
			  "collapsible",
			  "color-picker",
			  "combobox",
			  "date-input",
			  "date-picker",
			  "dialog",
			  "drawer",
			  "field",
			  "fieldset",
			  "file-upload",
			  "hover-card",
			  "listbox",
			  "menu",
			  "number-input",
			  "pagination",
			  "popover",
			  "progress",
			  "radio-group",
			  "rating-group",
			  "select",
			  "signature-pad",
			  "slider",
			  "splitter",
			  "steps",
			  "switch",
			  "tabs",
			  "tags-input",
			  "toast",
			  "toggle",
			  "toggle-group",
			  "tooltip",
			  "tour",
			  "tree-view",
			]
		`)
	})

	sharedComponents.forEach(componentName=> {
		it(`matches ark-solid anatomy for ${componentName}`, async ()=> {
			const [plasticAnatomy, solidAnatomy] = await Promise.all([
				getAnatomy('plastic', componentName, 'js'),
				getAnatomy('solid', componentName, 'ts'),
			])

			const plasticKeys = plasticAnatomy.keys().slice().sort()
			const solidKeys = solidAnatomy.keys().slice().sort()
			const allowedExtras = (plasticOnlyExtensions[componentName] ?? []).slice().sort()
			const missingKeys = solidKeys.filter(key=> !plasticKeys.includes(key))
			const extraKeys = plasticKeys.filter(key=> !solidKeys.includes(key))

			expect({ componentName, missingKeys }).toEqual({ componentName, missingKeys: [] })
			expect(extraKeys).toEqual(allowedExtras)

			const plasticParts = plasticAnatomy.build()
			const solidParts = solidAnatomy.build()

			solidKeys.forEach(key=> {
				expect(plasticParts[key]?.attrs).toEqual(solidParts[key]?.attrs)
				expect(plasticParts[key]?.selector).toEqual(solidParts[key]?.selector)
			})
		})
	})
})

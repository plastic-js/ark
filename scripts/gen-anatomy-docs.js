#!/usr/bin/env node
/**
 * Generates anatomy.md from all *.anatomy.js files in src/components.
 *
 * Usage:
 *   node scripts/gen-anatomy-docs.js
 *
 * Add to package.json scripts:
 *   "gen:anatomy": "node scripts/gen-anatomy-docs.js"
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const componentsDir = resolve(__dirname, '../src/components')
const outputPath = resolve(__dirname, '../anatomy.md')

function findAnatomyFiles(dir) {
	const results = []
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry)
		if (statSync(full).isDirectory()) {
			const candidate = join(full, `${entry}.anatomy.js`)
			try {
				statSync(candidate)
				results.push(candidate)
			} catch {
				// no anatomy file for this component
			}
		}
	}
	return results.sort()
}

function componentName(filePath) {
	// "accordion.anatomy.js" → "Accordion"
	const base = filePath.split('/').at(-1).replace('.anatomy.js', '')
	return base.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

function detectStrategy(source) {
	if (source.includes('createAnatomy')) return 'custom'
	if (source.includes('extendWith')) return 'extended'
	return 'reexport'
}

const strategyLabel = {
	reexport: 'Zag-js re-export',
	extended: 'Zag-js extended',
	custom: 'Custom',
}

async function main() {
	const files = findAnatomyFiles(componentsDir)
	const rows = []

	for (const file of files) {
		const source = readFileSync(file, 'utf8')
		const strategy = detectStrategy(source)
		const url = pathToFileURL(file).href
		const mod = await import(url)
		const exportKey = Object.keys(mod)[0]
		const anatomy = mod[exportKey]
		const parts = anatomy.keys()
		rows.push({ name: componentName(file), exportKey, strategy, parts })
	}

	const lines = []

	lines.push('# Anatomy')
	lines.push('')
	lines.push('> **Auto-generated** — run `npm run gen:anatomy` to regenerate after changing any `*.anatomy.js` file.')
	lines.push('')
	lines.push('Every rendered element in ark-plastic carries two HTML attributes:')
	lines.push('')
	lines.push('- `data-scope` — identifies the component (e.g. `"dialog"`).')
	lines.push('- `data-part` — identifies the structural role within that component (e.g. `"content"`).')
	lines.push('')
	lines.push('These two attributes together give you stable CSS selectors without class-name management:')
	lines.push('')
	lines.push('```css')
	lines.push('[data-scope="dialog"][data-part="content"] { background: white; }')
	lines.push('[data-scope="dialog"][data-part="content"][data-state="open"] { animation: fadeIn 200ms ease; }')
	lines.push('```')
	lines.push('')
	lines.push('## Anatomy object API')
	lines.push('')
	lines.push('Each component exports a named anatomy object (e.g. `accordionAnatomy`). The object exposes:')
	lines.push('')
	lines.push('| Method | Returns | Description |')
	lines.push('|---|---|---|')
	lines.push('| `.keys()` | `string[]` | List of registered part names (camelCase). |')
	lines.push('| `.build()` | `Record<part, { selector, attrs }>` | Generate selectors and attribute objects for all parts. |')
	lines.push('| `.extendWith(...parts)` | anatomy | Return a new anatomy with additional plastic-specific parts appended. |')
	lines.push('')
	lines.push('```js')
	lines.push('import { accordionAnatomy } from "ark-plastic/accordion"')
	lines.push('')
	lines.push('accordionAnatomy.keys()')
	lines.push('// → ["root", "item", "itemTrigger", "itemContent", "itemIndicator"]')
	lines.push('')
	lines.push('const parts = accordionAnatomy.build()')
	lines.push('parts.itemTrigger.attrs     // → { "data-scope": "accordion", "data-part": "item-trigger" }')
	lines.push('parts.itemTrigger.selector  // → \'[data-scope="accordion"][data-part="item-trigger"]\'')
	lines.push('```')
	lines.push('')
	lines.push('## Anatomy strategies')
	lines.push('')
	lines.push('| Strategy | When used | Example |')
	lines.push('|---|---|---|')
	lines.push('| **Zag-js re-export** | Component has a `@zag-js/*` package with its own anatomy. Part names and selectors stay in sync automatically. | `export { anatomy as accordionAnatomy } from \'@zag-js/accordion\'` |')
	lines.push('| **Zag-js extended** | Component needs Plastic-specific extra parts on top of the Zag-js baseline. | `anatomy.extendWith(\'group\')` |')
	lines.push('| **Custom** | No Zag-js equivalent exists (e.g. `field`, `fieldset`). Anatomy is defined with the local `createAnatomy` utility. | `createAnatomy(\'field\').parts(\'root\', \'label\', ...)` |')
	lines.push('')
	lines.push('## Per-component anatomy')
	lines.push('')
	lines.push('| Component | Export | Strategy | Parts |')
	lines.push('|---|---|---|---|')

	for (const { name, exportKey, strategy, parts } of rows) {
		const partsStr = parts.map((p) => `\`${p}\``).join(', ')
		lines.push(`| ${name} | \`${exportKey}\` | ${strategyLabel[strategy]} | ${partsStr} |`)
	}

	lines.push('')

	writeFileSync(outputPath, lines.join('\n'), 'utf8')
	console.log(`Written: ${relative(process.cwd(), outputPath)} (${rows.length} components)`)
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})

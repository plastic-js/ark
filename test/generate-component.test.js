import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { generateComponent, syncComponentsIndex } from '../scripts/generate-component.js'

const tempDirectories = []

const createPackageRoot = ()=> {
	const packageRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ark-plastic-'))
	const componentsDirectory = path.join(packageRoot, 'src', 'components')

	fs.mkdirSync(componentsDirectory, { recursive: true })
	fs.writeFileSync(path.join(componentsDirectory, 'index.js'), '', 'utf8')
	tempDirectories.push(packageRoot)

	return packageRoot
}

afterEach(() => {
	tempDirectories.splice(0).forEach((directory)=> {
		fs.rmSync(directory, { recursive: true, force: true })
	})
})

describe('generate-component script', () => {
	it('creates the Milestone 4 scaffold and syncs component exports', () => {
		const packageRoot = createPackageRoot()
		const result = generateComponent({
			componentName: 'Accordion',
			parts: ['item', 'trigger'],
			packageRoot,
		})
		const componentDirectory = path.join(packageRoot, 'src', 'components', 'accordion')
		const componentsIndex = fs.readFileSync(path.join(packageRoot, 'src', 'components', 'index.js'), 'utf8')
		const componentIndex = fs.readFileSync(path.join(componentDirectory, 'index.js'), 'utf8')
		const componentNamespace = fs.readFileSync(path.join(componentDirectory, 'accordion.js'), 'utf8')

		expect(result).toEqual({
			componentDirectory,
			componentFileName: 'accordion',
			componentName: 'Accordion',
			parts: ['root', 'item', 'trigger'],
		})
		expect(componentsIndex).toContain("export * from './accordion/index.js'")
		expect(componentIndex).toContain("export { Accordion, Root } from './accordion.js'")
		expect(componentIndex).toContain("export { AccordionItem } from './accordion-item.jsx'")
		expect(componentIndex).toContain("export { AccordionTrigger } from './accordion-trigger.jsx'")
		expect(componentNamespace).toContain('export const Accordion = Object.assign(AccordionRoot, accordionParts)')
		expect(componentNamespace).toContain('Root: AccordionRoot')
		expect(componentNamespace).toContain('Item: AccordionItem')
		expect(componentNamespace).toContain('Trigger: AccordionTrigger')
		expect(fs.existsSync(path.join(componentDirectory, 'tests', 'accordion.test.js'))).toBe(true)
	})

	it('refuses to overwrite an existing component directory', () => {
		const packageRoot = createPackageRoot()
		const componentDirectory = path.join(packageRoot, 'src', 'components', 'accordion')

		fs.mkdirSync(componentDirectory, { recursive: true })

		expect(() => generateComponent({ componentName: 'Accordion', packageRoot })).toThrow(
			`Component directory already exists: ${componentDirectory}`,
		)
	})

	it('rebuilds the component export file from discovered component folders', () => {
		const packageRoot = createPackageRoot()
		const componentsDirectory = path.join(packageRoot, 'src', 'components')

		;['dialog', 'accordion'].forEach((directory)=> {
			fs.mkdirSync(path.join(componentsDirectory, directory), { recursive: true })
			fs.writeFileSync(path.join(componentsDirectory, directory, 'index.js'), `export const name = '${directory}'\n`, 'utf8')
		})

		const componentDirectories = syncComponentsIndex({ packageRoot })
		const componentsIndex = fs.readFileSync(path.join(componentsDirectory, 'index.js'), 'utf8')

		expect(componentDirectories).toEqual(['accordion', 'dialog'])
		expect(componentsIndex).toContain("export * from './accordion/index.js'")
		expect(componentsIndex).toContain("export * from './dialog/index.js'")
	})
})

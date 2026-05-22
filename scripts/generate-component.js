import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DEFAULT_PARTS = ['root']

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const defaultPackageRoot = path.resolve(__dirname, '..')

const capitalize = value=> value.charAt(0).toUpperCase() + value.slice(1)

const normalizeKebabCase = value=> value
	.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
	.replace(/[_\s]+/g, '-')
	.replace(/-+/g, '-')
	.toLowerCase()
	.replace(/^-|-$/g, '')

const toPascalCase = value=> normalizeKebabCase(value)
	.split('-')
	.filter(Boolean)
	.map(capitalize)
	.join('')

const toCamelCase = (value)=> {
	const pascalCase = toPascalCase(value)
	return pascalCase ? pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1) : ''
}

const normalizeParts = (parts = DEFAULT_PARTS)=> {
	const resolvedParts = parts.length > 0 ? parts : DEFAULT_PARTS
	const normalizedParts = [...new Set(resolvedParts
		.map(normalizeKebabCase)
		.filter(Boolean))]

	if (!normalizedParts.includes('root')){
		return ['root', ...normalizedParts]
	}

	return normalizedParts
}

const buildAnatomyName = componentFileName=> `${toCamelCase(componentFileName)}Anatomy`
const buildHookName = componentFileName=> `use${toPascalCase(componentFileName)}`
const buildProviderName = componentFileName=> `${toPascalCase(componentFileName)}Provider`
const buildContextHookName = componentFileName=> `use${toPascalCase(componentFileName)}Context`
const buildPartExportName = (componentName, partName)=> `${componentName}${toPascalCase(partName)}`

const renderNamespaceModule = ({
	componentName, componentFileName, parts,
})=> {
	const imports = parts.map(partName=> `import { ${buildPartExportName(componentName, partName)} } from './${componentFileName}-${partName}.jsx'`).join('\n')
	const partEntries = parts.map(partName=> `\t${toPascalCase(partName)}: ${buildPartExportName(componentName, partName)}`).join(',\n')
	const aliasExports = parts.map(partName=> `${buildPartExportName(componentName, partName)} as ${toPascalCase(partName)}`).join(', ')
	const rootExportName = buildPartExportName(componentName, 'root')
	const partsBinding = `${toCamelCase(componentName)}Parts`

	return `${imports}

const ${partsBinding} = {
${partEntries},
}

export const ${componentName} = Object.assign(${rootExportName}, ${partsBinding})
export { ${aliasExports} }
`
}

const renderAnatomyModule = ({ componentFileName, parts })=> `import { createAnatomy } from '../anatomy.js'

export const ${buildAnatomyName(componentFileName)} = createAnatomy('${componentFileName}').parts(${parts.map(partName=> `'${partName}'`).join(', ')})
`

const renderContextModule = ({ componentName })=> `import { createContext } from '../../utils/index.js'

const [${buildProviderName(componentName)}, ${buildContextHookName(componentName)}] = createContext({
\tstrict: false,
\thookName: '${buildContextHookName(componentName)}',
\tproviderName: '<${buildProviderName(componentName)} />',
\tdefaultValue: null,
})

export { ${buildProviderName(componentName)}, ${buildContextHookName(componentName)} }
`

const renderUseModule = ({ componentName, componentFileName })=> `import * as ${toCamelCase(componentFileName)} from '@zag-js/${componentFileName}'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createSplitProps, createUniqueId, mergeProps, mergeRefs } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> (typeof value === 'function' ? value() : value)

// TODO: update prop list to match @zag-js/${componentFileName} props
const split${componentName}Props = createSplitProps([
\t...${toCamelCase(componentFileName)}.props,
\t'rootRef',
\t'asChild',
\t'children',
])

export const ${buildHookName(componentFileName)} = (props = {})=> {
\tconst [machineProps, elementProps] = split${componentName}Props(props)
\tconst id = createUniqueId('${componentFileName}')
\tconst locale = useLocaleContext()
\tconst environment = useEnvironmentContext()
\tconst service = useMachine(${toCamelCase(componentFileName)}.machine, ()=> ({
\t\tid,
\t\tdir: locale.dir,
\t\tgetRootNode: environment.getRootNode,
\t\t...machineProps,
\t\t// TODO: map remaining props (open, defaultOpen, onXxxChange, etc.)
\t}))

\treturn createComputed(()=> {
\t\tconst api = ${toCamelCase(componentFileName)}.connect(service, normalizeProps)
\t\treturn {
\t\t\t...api,
\t\t\tgetRootProps: ()=> mergeProps(api.getRootProps(), elementProps, {
\t\t\t\tref: mergeRefs(elementProps.ref, machineProps.rootRef),
\t\t\t\tasChild: machineProps.asChild,
\t\t\t\tchildren: machineProps.children,
\t\t\t}),
\t\t}
\t})
}
`

const renderRootPartModule = ({ componentName, componentFileName })=> `import { ark } from '../factory.js'
import { ${buildHookName(componentFileName)} } from './use-${componentFileName}.js'

export const ${buildPartExportName(componentName, 'root')} = (props = {})=> {
\tconst ${toCamelCase(componentName)} = ${buildHookName(componentFileName)}(props)
\treturn ark.div(${toCamelCase(componentName)}.getRootProps())
}
`

const renderLeafPartModule = ({
	componentName, componentFileName, partName,
})=> `import { ark } from '../factory.js'
import { ${buildAnatomyName(componentFileName)} } from './${componentFileName}.anatomy.js'

export const ${buildPartExportName(componentName, partName)} = (props = {})=> {
\tconst anatomy = ${buildAnatomyName(componentFileName)}.build()
\treturn ark.div({
\t\t...props,
\t\t...anatomy.${partName}.attrs,
\t})
}
`

const renderShowcaseModule = ({ componentName, componentFileName, parts })=> {
	const partLines = parts
		.filter(partName=> partName !== 'root')
		.map(partName=> `\t\t\t\t<${componentName}.${toPascalCase(partName)} />`)
		.join('\n')
	const anatomyLines = parts
		.filter(partName=> partName !== 'root')
		.map(partName=> `  <${componentName}.${toPascalCase(partName)} />`)
		.join('\n')
	return `import { ${componentName} } from '../../../index.js'

const ${componentName}Showcase = ()=> (
\t<div className='container'>
\t\t<header className='hero'>
\t\t\t<p className='eyebrow'>ark-plastic component showcase</p>
\t\t\t<h1>${componentName}</h1>
\t\t\t<p className='hero-copy'>Live, component-specific demo for ${componentName}.</p>
\t\t</header>
\t\t<section className='feature-card'>
\t\t\t<${componentName}.Root>
${partLines}
\t\t\t</${componentName}.Root>
\t\t\t<code className='anatomy'>{\`<${componentName}.Root>\n${anatomyLines}\n</${componentName}.Root>\`}</code>
\t\t\t<div className='checklist' />
\t\t</section>
\t</div>
)

export default ${componentName}Showcase
`
}

const renderIndexModule = ({ componentName, componentFileName })=> `export { ${buildAnatomyName(componentFileName)} } from './${componentFileName}.anatomy.js'
export { ${componentName}, Root } from './${componentFileName}.js'
export { ${buildProviderName(componentName)}, ${buildContextHookName(componentName)} } from './${componentFileName}-context.js'
export { ${buildPartExportName(componentName, 'root')} } from './${componentFileName}-root.jsx'
export { ${buildHookName(componentFileName)} } from './use-${componentFileName}.js'
`

const renderTestModule = ({ componentName, componentFileName, parts })=> {
	const leafParts = parts.filter(partName=> partName !== 'root')
	const leafImports = leafParts.length > 0
		? `, ${leafParts.map(partName=> buildPartExportName(componentName, partName)).join(', ')}`
		: ''
	const leafTests = leafParts.map(partName=> `
\tit('${partName} part applies anatomy attrs', () => {
\t\tconst el = ${buildPartExportName(componentName, partName)}({})
\t\texpect(el.dataset.scope).toBe('${componentFileName}')
\t\texpect(el.dataset.part).toBe('${partName}')
\t})`).join('\n')

	return `// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { ${componentName}, ${buildPartExportName(componentName, 'root')}, ${buildAnatomyName(componentFileName)}${leafImports} } from '../index.js'

describe('@ark-ui/plastic ${componentName} contract', () => {
\tit('exposes Root through the component namespace', () => {
\t\texpect(typeof ${componentName}).toBe('function')
\t\texpect(${componentName}.Root).toBe(${buildPartExportName(componentName, 'root')})
\t})

\tit('anatomy covers all parts', () => {
\t\texpect(${buildAnatomyName(componentFileName)}.keys()).toEqual(
\t\t\texpect.arrayContaining([${parts.map(p=> `'${p}'`).join(', ')}]),
\t\t)
\t})
${leafTests}
})
`
}

const renderPartExportLine = ({
	componentName, partName, componentFileName,
})=> `export { ${buildPartExportName(componentName, partName)} } from './${componentFileName}-${partName}.jsx'`

const buildFileMap = ({
	componentName, componentFileName, parts,
})=> {
	const files = new Map([
		[`${componentFileName}.anatomy.js`, renderAnatomyModule({ componentFileName, parts })],
		[`${componentFileName}.js`,
			renderNamespaceModule({
				componentName, componentFileName, parts,
			})],
		[`${componentFileName}-context.js`, renderContextModule({ componentName })],
		[`use-${componentFileName}.js`, renderUseModule({ componentName, componentFileName })],
		[`${componentFileName}-root.jsx`, renderRootPartModule({ componentName, componentFileName })],
		['index.js',
			[
				renderIndexModule({ componentName, componentFileName }),
				...parts
					.filter(partName=> partName !== 'root')
					.map(partName=> renderPartExportLine({
						componentName, partName, componentFileName,
					})),
			].join('')],
		[path.join('tests', `${componentFileName}.test.js`), renderTestModule({ componentName, componentFileName, parts })],
		[path.join('showcases', `${componentName}Showcase.jsx`), renderShowcaseModule({ componentName, componentFileName, parts })],
	])

	parts
		.filter(partName=> partName !== 'root')
		.forEach((partName)=> {
			files.set(`${componentFileName}-${partName}.jsx`, renderLeafPartModule({
				componentName, componentFileName, partName,
			}))
		})

	return files
}

const getComponentDirectories = componentsDirectory=> fs.readdirSync(componentsDirectory, { withFileTypes: true })
	.filter(entry=> entry.isDirectory() && fs.existsSync(path.join(componentsDirectory, entry.name, 'index.js')))
	.map(entry=> entry.name)
	.sort((left, right)=> left.localeCompare(right))

const buildComponentsIndexContent = componentDirectories=> [
	'// This file is maintained by scripts/generate-component.js.',
	'export { ark, mergeProps } from \'./factory.js\'',
	'export { createAnatomy } from \'./anatomy.js\'',
	...componentDirectories.map(directory=> `export * from './${directory}/index.js'`),
	'',
].join('\n')

export const syncComponentsIndex = ({ packageRoot = defaultPackageRoot } = {})=> {
	const componentsDirectory = path.join(packageRoot, 'src', 'components')
	const componentDirectories = getComponentDirectories(componentsDirectory)
	const componentsIndexPath = path.join(componentsDirectory, 'index.js')

	fs.writeFileSync(componentsIndexPath, buildComponentsIndexContent(componentDirectories), 'utf8')

	return componentDirectories
}

export const generateComponent = ({
	componentName,
	parts = DEFAULT_PARTS,
	packageRoot = defaultPackageRoot,
} = {})=> {
	const componentFileName = normalizeKebabCase(componentName ?? '')

	if (!componentFileName){
		throw new Error('Component name is required. Usage: npm run generate:component -- <component-name> [--parts root,item]')
	}

	const componentExportName = toPascalCase(componentFileName)
	const normalizedParts = normalizeParts(parts)
	const componentDirectory = path.join(packageRoot, 'src', 'components', componentFileName)

	if (fs.existsSync(componentDirectory)){
		throw new Error(`Component directory already exists: ${componentDirectory}`)
	}

	fs.mkdirSync(path.join(componentDirectory, 'tests'), { recursive: true })
	fs.mkdirSync(path.join(componentDirectory, 'showcases'), { recursive: true })

	buildFileMap({
		componentName: componentExportName,
		componentFileName,
		parts: normalizedParts,
	}).forEach((content, relativeFilePath)=> {
		fs.writeFileSync(path.join(componentDirectory, relativeFilePath), content, 'utf8')
	})

	syncComponentsIndex({ packageRoot })

	return {
		componentDirectory,
		componentFileName,
		componentName: componentExportName,
		parts: normalizedParts,
	}
}

const parseCliArgs = (argv)=> {
	const args = [...argv]
	const positional = []
	let packageRoot = defaultPackageRoot
	let parts = DEFAULT_PARTS

	while (args.length > 0){
		const current = args.shift()

		if (current === '--parts'){
			parts = (args.shift() ?? '')
				.split(',')
				.map(partName=> partName.trim())
				.filter(Boolean)
			continue
		}

		if (current === '--root'){
			packageRoot = path.resolve(args.shift() ?? defaultPackageRoot)
			continue
		}

		positional.push(current)
	}

	return {
		componentName: positional[0],
		packageRoot,
		parts,
	}
}

const runCli = ()=> {
	try {
		const result = generateComponent(parseCliArgs(process.argv.slice(2)))
		console.log(`Generated ${result.componentName} in ${path.relative(defaultPackageRoot, result.componentDirectory)}`)
	} catch(error){
		console.error(error.message)
		process.exitCode = 1
	}
}

if (process.argv[1] === __filename){
	runCli()
}

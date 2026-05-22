import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const appPath = resolve(here, '../showcase/app.jsx')
const source = readFileSync(appPath, 'utf8')

const entryRe = /\{\s*name:\s*'([^']+)',\s*path:\s*'([^']+)',\s*Component:\s*\w+\s*\}/g

export const showcases = []
let m
while ((m = entryRe.exec(source)) !== null) {
	showcases.push({ name: m[1], path: m[2] })
}

if (showcases.length === 0) {
	throw new Error('Failed to extract any showcase routes from showcase/app.jsx')
}

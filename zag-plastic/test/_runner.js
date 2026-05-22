import { readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tests } from './_register.js'

const here = dirname(fileURLToPath(import.meta.url))
const files = readdirSync(here).filter((f) => f.endsWith('.test.js'))
for (const file of files) {
    await import(pathToFileURL(resolve(here, file)).href)
}

let passed = 0
let failed = 0
for (const { name, fn } of tests) {
    try {
        await fn()
        passed++
        console.log(`  ok  ${name}`)
    } catch (err) {
        failed++
        console.error(`  FAIL ${name}`)
        console.error(err)
    }
}
console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)

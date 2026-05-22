import { test, expect } from '@playwright/test'
import { showcases } from './routes.js'

const IGNORE_CONSOLE = [
	/\[vite\]/i,
	/Download the React DevTools/i,
	/Failed to load resource/i,
]

for (const { name, path } of showcases) {
	test(`showcase renders: ${name} (${path})`, async ({ page }) => {
		const consoleErrors = []
		const pageErrors = []

		page.on('console', (msg)=> {
			if (msg.type() !== 'error') return
			const text = msg.text()
			if (IGNORE_CONSOLE.some((r)=> r.test(text))) return
			consoleErrors.push(text)
		})
		page.on('pageerror', (err)=> {
			pageErrors.push(err.message)
		})

		await page.goto(path, { waitUntil: 'domcontentloaded' })

		const main = page.locator('main.main')
		await expect(main).toBeVisible()
		await expect(main).not.toBeEmpty()

		const activeNav = page.locator('.nav-btn.active')
		await expect(activeNav).toBeVisible()

		await page.waitForTimeout(150)

		expect(pageErrors, `page errors on ${path}:\n${pageErrors.join('\n')}`).toEqual([])
		expect(consoleErrors, `console errors on ${path}:\n${consoleErrors.join('\n')}`).toEqual([])
	})
}

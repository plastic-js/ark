import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	reporter: [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL: 'http://localhost:3333',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
	],
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:3333',
		reuseExistingServer: true,
		timeout: 60_000,
	},
})

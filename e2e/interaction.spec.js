import { test, expect } from '@playwright/test'

const IGNORE_CONSOLE = [
	/\[vite\]/i,
	/Download the React DevTools/i,
	/Failed to load resource/i,
]

const attachErrorListeners = (page)=> {
	const consoleErrors = []
	const pageErrors = []
	page.on('console', (msg)=> {
		if (msg.type() !== 'error') return
		const text = msg.text()
		if (IGNORE_CONSOLE.some((r)=> r.test(text))) return
		consoleErrors.push(text)
	})
	page.on('pageerror', (err)=> { pageErrors.push(err.message) })
	return { consoleErrors, pageErrors }
}

const assertNoErrors = ({ consoleErrors, pageErrors }, where)=> {
	expect(pageErrors, `page errors on ${where}:\n${pageErrors.join('\n')}`).toEqual([])
	expect(consoleErrors, `console errors on ${where}:\n${consoleErrors.join('\n')}`).toEqual([])
}

test.describe('Accordion', ()=> {
	test('clicking a trigger toggles its content', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/accordion')

		const shippingTrigger = page.locator('[data-scope="accordion"][data-part="item-trigger"]', { hasText: 'Shipping' })
		const returnsTrigger = page.locator('[data-scope="accordion"][data-part="item-trigger"]', { hasText: 'Returns' })

		await expect(shippingTrigger).toHaveAttribute('data-state', 'open')
		await expect(returnsTrigger).toHaveAttribute('data-state', 'closed')

		await returnsTrigger.click()
		await expect(returnsTrigger).toHaveAttribute('data-state', 'open')
		await expect(shippingTrigger).toHaveAttribute('data-state', 'closed')

		assertNoErrors(errs, '/accordion')
	})
})

test.describe('Dialog', ()=> {
	test('trigger opens dialog, close button closes it', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/dialog')

		const trigger = page.locator('[data-scope="dialog"][data-part="trigger"]', { hasText: 'Open dialog' }).first()
		await trigger.click()

		const content = page.locator('[data-scope="dialog"][data-part="content"]').first()
		await expect(content).toBeVisible()
		await expect(content).toHaveAttribute('data-state', 'open')

		const close = content.locator('[data-scope="dialog"][data-part="close-trigger"]')
		await close.click()
		await expect(content).toBeHidden()

		assertNoErrors(errs, '/dialog')
	})

	test('Escape key closes dialog', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/dialog')

		await page.locator('[data-scope="dialog"][data-part="trigger"]', { hasText: 'Open dialog' }).first().click()
		const content = page.locator('[data-scope="dialog"][data-part="content"]').first()
		await expect(content).toBeVisible()

		await page.keyboard.press('Escape')
		await expect(content).toBeHidden()

		assertNoErrors(errs, '/dialog')
	})
})

test.describe('Switch', ()=> {
	test('clicking control toggles checked state', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/switch')

		const control = page.locator('[data-scope="switch"][data-part="control"]')
		await expect(control).toHaveAttribute('data-state', 'unchecked')

		await control.click()
		await expect(control).toHaveAttribute('data-state', 'checked')

		await control.click()
		await expect(control).toHaveAttribute('data-state', 'unchecked')

		assertNoErrors(errs, '/switch')
	})
})

test.describe('Combobox', ()=> {
	test('typing filters items and selecting one updates input', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/combobox')

		const root = page.locator('[data-scope="combobox"][data-part="root"]').first()
		const input = root.locator('[data-scope="combobox"][data-part="input"]')
		const trigger = root.locator('[data-scope="combobox"][data-part="trigger"]')
		const content = root.locator('[data-scope="combobox"][data-part="content"]')

		await trigger.click()
		await expect(content).toBeVisible()

		await input.fill('man')
		const mango = content.locator('[data-scope="combobox"][data-part="item"]', { hasText: 'Mango' })
		await expect(mango).toBeVisible()
		await mango.click()

		await expect(input).toHaveValue(/Mango/i)

		assertNoErrors(errs, '/combobox')
	})
})

test.describe('Collapsible', ()=> {
	test('trigger toggles content visibility', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/collapsible')

		const trigger = page.locator('[data-scope="collapsible"][data-part="trigger"]').first()
		const content = page.locator('[data-scope="collapsible"][data-part="content"]').first()

		const initialState = await trigger.getAttribute('data-state')
		await trigger.click()
		const nextState = initialState === 'open' ? 'closed' : 'open'
		await expect(trigger).toHaveAttribute('data-state', nextState)

		if (nextState === 'open') await expect(content).toBeVisible()
		else await expect(content).toBeHidden()

		assertNoErrors(errs, '/collapsible')
	})
})

test.describe('Tabs', ()=> {
	test('clicking a tab switches active panel', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/tabs')

		const triggers = page.locator('[data-scope="tabs"][data-part="trigger"]')
		const count = await triggers.count()
		expect(count).toBeGreaterThanOrEqual(2)

		const first = triggers.nth(0)
		const second = triggers.nth(1)

		await expect(first).toHaveAttribute('aria-selected', 'true')
		await second.click()
		await expect(second).toHaveAttribute('aria-selected', 'true')
		await expect(first).toHaveAttribute('aria-selected', 'false')

		assertNoErrors(errs, '/tabs')
	})
})

test.describe('Checkbox', ()=> {
	test('clicking root toggles checked state', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/checkbox')

		const root = page.locator('[data-scope="checkbox"][data-part="root"]').first()
		const control = root.locator('[data-scope="checkbox"][data-part="control"]')
		const initial = await control.getAttribute('data-state')

		await control.click()
		await expect(control).not.toHaveAttribute('data-state', initial)

		assertNoErrors(errs, '/checkbox')
	})
})

test.describe('Popover', ()=> {
	test('trigger opens popover content', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/popover')

		const trigger = page.locator('[data-scope="popover"][data-part="trigger"]').first()
		await trigger.click()

		const content = page.locator('[data-scope="popover"][data-part="content"]').first()
		await expect(content).toBeVisible()
		await expect(content).toHaveAttribute('data-state', 'open')

		assertNoErrors(errs, '/popover')
	})
})

test.describe('Menu', ()=> {
	test('trigger opens menu', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/menu')

		const trigger = page.locator('[data-scope="menu"][data-part="trigger"]').first()
		await trigger.click()

		const content = page.locator('[data-scope="menu"][data-part="content"]').first()
		await expect(content).toBeVisible()

		assertNoErrors(errs, '/menu')
	})
})

test.describe('NumberInput', ()=> {
	test('increment button raises the value', async ({ page })=> {
		const errs = attachErrorListeners(page)
		await page.goto('/number-input')

		const input = page.locator('[data-scope="number-input"][data-part="input"]').first()
		const inc = page.locator('[data-scope="number-input"][data-part="increment-trigger"]').first()

		const before = Number((await input.inputValue()) || '0')
		await inc.click()
		const after = Number(await input.inputValue())
		expect(after).toBeGreaterThan(before)

		assertNoErrors(errs, '/number-input')
	})
})

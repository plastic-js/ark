// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import {
	EnvironmentProvider,
	InteractionProvider,
	LocaleProvider,
	ark,
	useEnvironmentContext,
	useInteractionContext,
	useLocaleContext,
} from '../src/index.js'
import { h, renderApp } from '../src/runtime.js'

afterEach(() => {
	document.body.innerHTML = ''
})

describe('@ark-ui/plastic providers', () => {
	it('useEnvironmentContext returns sensible browser defaults without a provider', () => {
		let snapshot = null
		const Consumer = () => {
			snapshot = useEnvironmentContext()
			return h('span', null, 'env')
		}

		renderApp(document.createElement('div'), h(Consumer))

		expect(snapshot.getDocument()).toBe(document)
		expect(snapshot.getWindow()).toBe(window)
		expect(snapshot.getRootNode()).toBe(document)
	})

	it('EnvironmentProvider nests and inherits missing environment getters from parents', () => {
		const customDocument = { name: 'custom-document' }
		const customWindow = { name: 'custom-window' }
		const customRoot = { name: 'custom-root' }
		let snapshot = null

		const Consumer = () => {
			snapshot = useEnvironmentContext()
			return h('span', null, 'nested-env')
		}

		renderApp(
			document.createElement('div'),
			h(
				EnvironmentProvider,
				{
					value: {
						getDocument: () => customDocument,
						getWindow: () => customWindow,
					},
					children: () => h(
						EnvironmentProvider,
						{
							value: {
								getRootNode: () => customRoot,
							},
							children: () => h(Consumer),
						},
					),
				},
			),
		)

		expect(snapshot.getDocument()).toBe(customDocument)
		expect(snapshot.getWindow()).toBe(customWindow)
		expect(snapshot.getRootNode()).toBe(customRoot)
	})

	it('LocaleProvider supports direct props and nested fallback values', () => {
		const LocaleProbe = () => {
			const locale = useLocaleContext()
			return ark.div({
				dir: locale.dir,
				lang: locale.locale,
				'data-dir': locale.dir,
				'data-locale': locale.locale,
			})
		}

		const container = document.createElement('div')
		renderApp(
			container,
			h(
				LocaleProvider,
				{
					locale: 'en-GB',
					dir: 'ltr',
					children: () => h(LocaleProvider, { dir: 'rtl', children: () => h(LocaleProbe) }),
				},
			),
		)

		const element = container.firstChild
		expect(element.getAttribute('dir')).toBe('rtl')
		expect(element.getAttribute('lang')).toBe('en-GB')
		expect(element.dataset.dir).toBe('rtl')
		expect(element.dataset.locale).toBe('en-GB')
	})

	it('LocaleProvider still accepts the previous value object shape', () => {
		let snapshot = null
		const Consumer = () => {
			snapshot = useLocaleContext()
			return h('span', null, snapshot.dir)
		}

		renderApp(
			document.createElement('div'),
			h(LocaleProvider, {
				value: { locale: 'ar', dir: 'rtl' },
				children: () => h(Consumer),
			}),
		)

		expect(snapshot).toEqual({ locale: 'ar', dir: 'rtl' })
	})

	it('InteractionProvider tracks keyboard and pointer modality for descendants', () => {
		const InteractionProbe = () => {
			const interaction = useInteractionContext()
			return ark.button({
				'data-modality': () => interaction.modality(),
				'data-focus-visible': () => String(interaction.isFocusVisible()),
			})
		}

		const container = document.createElement('div')
		renderApp(container, h(InteractionProvider, { children: () => h(InteractionProbe) }))

		const element = container.firstChild
		expect(element.dataset.modality).toBe('pointer')
		expect(element.dataset.focusVisible).toBe('false')

		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
		expect(element.dataset.modality).toBe('keyboard')
		expect(element.dataset.focusVisible).toBe('true')

		document.dispatchEvent(new Event('pointerdown', { bubbles: true }))
		expect(element.dataset.modality).toBe('pointer')
		expect(element.dataset.focusVisible).toBe('false')
	})
})

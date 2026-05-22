import { createCollator, createFilter, isRTL, trackLocale } from '@zag-js/i18n-utils'
import { DateFormatter } from '@internationalized/date'
import { createSignal, onCleanup, onMount } from '../../runtime.js'
import { createContext } from '../../utils/index.js'

const DEFAULT_LOCALE_CONTEXT = { locale: 'en-US', dir: 'ltr' }

const [LocaleContextProvider, useLocaleContext] = createContext({
	strict: false,
	hookName: 'useLocaleContext',
	providerName: '<LocaleProvider />',
	defaultValue: DEFAULT_LOCALE_CONTEXT,
})

export const LocaleProvider = ({
	value, locale, dir, children,
})=> {
	const parentLocale = useLocaleContext()
	const resolvedLocale = locale ?? value?.locale ?? parentLocale.locale
	const resolvedDir = dir ?? value?.dir ?? (locale ? isRTL(locale) ? 'rtl' : 'ltr' : parentLocale.dir)

	// When no explicit locale is pinned, track the browser's locale reactively.
	// Use a signal-backed object so reactive contexts (e.g. useMachine factory)
	// automatically pick up language changes without a provider remount.
	if (!locale && !value && !dir){
		const sig = createSignal({ locale: resolvedLocale, dir: resolvedDir })
		const ctx = {
			get locale(){ return sig().locale },
			get dir(){ return sig().dir },
		}

		onMount(()=> {
			const cleanup = trackLocale({ onLocaleChange: next=> sig(next) })
			onCleanup(cleanup)
		})

		return LocaleContextProvider({ value: ctx, children })
	}

	// Static case: plain object — satisfies strict toEqual checks in tests.
	return LocaleContextProvider({ value: { locale: resolvedLocale, dir: resolvedDir }, children })
}

export { useLocaleContext }

// ── Utility hooks ────────────────────────────────────────────────────────────

export const useCollator = (props = {})=> {
	const locale = useLocaleContext()
	return ()=> {
		const resolved = typeof props === 'function' ? props() : props
		const { locale: localeProp, ...options } = resolved
		return createCollator(localeProp ?? locale.locale, options)
	}
}

export const useFilter = (props = {})=> {
	const locale = useLocaleContext()
	return ()=> {
		const resolved = typeof props === 'function' ? props() : props
		const { locale: localeProp, ...options } = resolved
		return createFilter({ ...options, locale: localeProp ?? locale.locale })
	}
}

export const useDateFormatter = (props = {})=> {
	const locale = useLocaleContext()
	return ()=> {
		const resolved = typeof props === 'function' ? props() : props
		const { locale: localeProp, ...options } = resolved
		return new DateFormatter(localeProp ?? locale.locale, options)
	}
}

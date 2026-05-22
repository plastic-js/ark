import {
	getInteractionModality,
	isFocusVisible,
	trackFocusVisible,
	trackInteractionModality,
} from '@zag-js/focus-visible'
import { createSignal, onCleanup } from '../../runtime.js'
import { createContext } from '../../utils/index.js'
import { useEnvironmentContext } from '../environment/index.js'

const createInteractionValue = (initialModality = 'pointer')=> {
	const modality = createSignal(initialModality)

	return {
		modality,
		isKeyboardModality: ()=> modality() === 'keyboard',
		isPointerModality: ()=> modality() === 'pointer',
		isFocusVisible: ()=> modality() === 'keyboard',
	}
}

const DEFAULT_INTERACTION_CONTEXT = createInteractionValue()

const [InteractionContextProvider, useInteractionContext] = createContext({
	strict: false,
	hookName: 'useInteractionContext',
	providerName: '<InteractionProvider />',
	defaultValue: DEFAULT_INTERACTION_CONTEXT,
})

export const InteractionProvider = ({ children })=> {
	const environment = useEnvironmentContext()
	const interaction = createInteractionValue()

	const cleanup = trackInteractionModality({
		root: environment.getRootNode(),
		// Skip null — the module's initial currentModality is null before any
		// interaction, so we keep our own 'pointer' default in that case.
		onChange: ({ modality: m })=> { if (m){ interaction.modality(m) } },
	})
	onCleanup(cleanup)

	return InteractionContextProvider({ value: interaction, children })
}

export { useInteractionContext }

// ── Utility hooks ────────────────────────────────────────────────────────────

export const useFocusVisible = (props = {})=> {
	const environment = useEnvironmentContext()
	const resolved = typeof props === 'function' ? props() : props
	const { isTextInput, autoFocus } = resolved

	const visible = createSignal(autoFocus || isFocusVisible())

	const cleanup = trackFocusVisible({
		root: environment.getRootNode(),
		isTextInput,
		autoFocus,
		onChange: ({ isFocusVisible: v })=> visible(v),
	})
	onCleanup(cleanup)

	return visible
}

export const useInteractionModality = ()=> {
	const environment = useEnvironmentContext()
	const modality = createSignal(getInteractionModality())

	const cleanup = trackInteractionModality({
		root: environment.getRootNode(),
		onChange: ({ modality: m })=> modality(m),
	})
	onCleanup(cleanup)

	return modality
}

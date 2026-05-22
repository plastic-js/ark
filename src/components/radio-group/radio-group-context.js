import { createContext } from '../../utils/index.js'

const [RadioGroupProvider, useRadioGroupContext] = createContext({
	strict: false,
	hookName: 'useRadioGroupContext',
	providerName: '<RadioGroupProvider />',
	defaultValue: null,
})

const [RadioGroupItemProvider, useRadioGroupItemContext] = createContext({
	strict: false,
	hookName: 'useRadioGroupItemContext',
	providerName: '<RadioGroupItemProvider />',
	defaultValue: null,
})

const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] = createContext({
	strict: false,
	hookName: 'useRadioGroupItemPropsContext',
	providerName: '<RadioGroupItemPropsProvider />',
	defaultValue: null,
})

export {
	RadioGroupItemProvider,
	RadioGroupItemPropsProvider,
	RadioGroupProvider,
	useRadioGroupContext,
	useRadioGroupItemContext,
	useRadioGroupItemPropsContext,
}

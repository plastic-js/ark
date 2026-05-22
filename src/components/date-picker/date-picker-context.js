import { createContext } from '../../utils/index.js'

export const [DatePickerProvider, useDatePickerContext] = createContext({
	hookName: 'useDatePickerContext',
	providerName: '<DatePicker.Root />',
})

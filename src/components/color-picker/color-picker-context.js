import { createContext } from '../../utils/index.js'

export const [ColorPickerProvider, useColorPickerContext] = createContext({
	hookName: 'useColorPickerContext',
	providerName: '<ColorPicker.Root />',
})

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] = createContext({
	hookName: 'useColorPickerChannelSliderContext',
	providerName: '<ColorPicker.ChannelSlider />',
})

export const [ColorPickerSwatchProvider, useColorPickerSwatchContext] = createContext({
	hookName: 'useColorPickerSwatchContext',
	providerName: '<ColorPicker.SwatchTrigger />',
})

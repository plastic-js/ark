import { ColorPickerRoot } from './color-picker-root.jsx'
import { ColorPickerLabel } from './color-picker-label.jsx'
import { ColorPickerControl } from './color-picker-control.jsx'
import { ColorPickerTrigger } from './color-picker-trigger.jsx'
import { ColorPickerPositioner } from './color-picker-positioner.jsx'
import { ColorPickerContent } from './color-picker-content.jsx'
import { ColorPickerInput } from './color-picker-input.jsx'
import { ColorPickerHiddenInput } from './color-picker-hidden-input.jsx'
import { ColorPickerSwatch } from './color-picker-swatch.jsx'
import { ColorPickerArea } from './color-picker-area.jsx'
import { ColorPickerAreaBackground } from './color-picker-area-background.jsx'
import { ColorPickerAreaThumb } from './color-picker-area-thumb.jsx'
import { ColorPickerChannelInput } from './color-picker-channel-input.jsx'
import { ColorPickerChannelSlider } from './color-picker-channel-slider.jsx'
import { ColorPickerChannelSliderLabel } from './color-picker-channel-slider-label.jsx'
import { ColorPickerChannelSliderTrack } from './color-picker-channel-slider-track.jsx'
import { ColorPickerChannelSliderThumb } from './color-picker-channel-slider-thumb.jsx'
import { ColorPickerChannelSliderValueText } from './color-picker-channel-slider-value-text.jsx'
import { ColorPickerEyeDropperTrigger } from './color-picker-eye-dropper-trigger.jsx'
import { ColorPickerFormatSelect } from './color-picker-format-select.jsx'
import { ColorPickerFormatTrigger } from './color-picker-format-trigger.jsx'
import { ColorPickerSwatchGroup } from './color-picker-swatch-group.jsx'
import { ColorPickerSwatchTrigger } from './color-picker-swatch-trigger.jsx'
import { ColorPickerSwatchIndicator } from './color-picker-swatch-indicator.jsx'
import { ColorPickerTransparencyGrid } from './color-picker-transparency-grid.jsx'
import { ColorPickerValueSwatch } from './color-picker-value-swatch.jsx'
import { ColorPickerValueText } from './color-picker-value-text.jsx'
import { ColorPickerView } from './color-picker-view.jsx'

const colorPickerParts = {
	Root: ColorPickerRoot,
	Label: ColorPickerLabel,
	Control: ColorPickerControl,
	Trigger: ColorPickerTrigger,
	Positioner: ColorPickerPositioner,
	Content: ColorPickerContent,
	Input: ColorPickerInput,
	HiddenInput: ColorPickerHiddenInput,
	Swatch: ColorPickerSwatch,
	Area: ColorPickerArea,
	AreaBackground: ColorPickerAreaBackground,
	AreaThumb: ColorPickerAreaThumb,
	ChannelInput: ColorPickerChannelInput,
	ChannelSlider: ColorPickerChannelSlider,
	ChannelSliderLabel: ColorPickerChannelSliderLabel,
	ChannelSliderTrack: ColorPickerChannelSliderTrack,
	ChannelSliderThumb: ColorPickerChannelSliderThumb,
	ChannelSliderValueText: ColorPickerChannelSliderValueText,
	EyeDropperTrigger: ColorPickerEyeDropperTrigger,
	FormatSelect: ColorPickerFormatSelect,
	FormatTrigger: ColorPickerFormatTrigger,
	SwatchGroup: ColorPickerSwatchGroup,
	SwatchTrigger: ColorPickerSwatchTrigger,
	SwatchIndicator: ColorPickerSwatchIndicator,
	TransparencyGrid: ColorPickerTransparencyGrid,
	ValueSwatch: ColorPickerValueSwatch,
	ValueText: ColorPickerValueText,
	View: ColorPickerView,
}

export const ColorPicker = Object.assign(ColorPickerRoot, colorPickerParts)
export {
	ColorPickerRoot as Root,
	ColorPickerLabel as Label,
	ColorPickerControl as Control,
	ColorPickerTrigger as Trigger,
	ColorPickerPositioner as Positioner,
	ColorPickerContent as Content,
	ColorPickerInput as Input,
	ColorPickerHiddenInput as HiddenInput,
	ColorPickerSwatch as Swatch,
	ColorPickerArea as Area,
	ColorPickerAreaBackground as AreaBackground,
	ColorPickerAreaThumb as AreaThumb,
	ColorPickerChannelInput as ChannelInput,
	ColorPickerChannelSlider as ChannelSlider,
	ColorPickerChannelSliderLabel as ChannelSliderLabel,
	ColorPickerChannelSliderTrack as ChannelSliderTrack,
	ColorPickerChannelSliderThumb as ChannelSliderThumb,
	ColorPickerChannelSliderValueText as ChannelSliderValueText,
	ColorPickerEyeDropperTrigger as EyeDropperTrigger,
	ColorPickerFormatSelect as FormatSelect,
	ColorPickerFormatTrigger as FormatTrigger,
	ColorPickerSwatchGroup as SwatchGroup,
	ColorPickerSwatchTrigger as SwatchTrigger,
	ColorPickerSwatchIndicator as SwatchIndicator,
	ColorPickerTransparencyGrid as TransparencyGrid,
	ColorPickerValueSwatch as ValueSwatch,
	ColorPickerValueText as ValueText,
	ColorPickerView as View,
}

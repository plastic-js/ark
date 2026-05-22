import { SliderControl } from './slider-control.jsx'
import { SliderDraggingIndicator } from './slider-dragging-indicator.jsx'
import { SliderHiddenInput } from './slider-hidden-input.jsx'
import { SliderLabel } from './slider-label.jsx'
import { SliderMarker } from './slider-marker.jsx'
import { SliderMarkerGroup } from './slider-marker-group.jsx'
import { SliderRange } from './slider-range.jsx'
import { SliderRoot } from './slider-root.jsx'
import { SliderThumb } from './slider-thumb.jsx'
import { SliderTrack } from './slider-track.jsx'
import { SliderValueText } from './slider-value-text.jsx'

const sliderParts = {
	Root: SliderRoot,
	Label: SliderLabel,
	Control: SliderControl,
	Track: SliderTrack,
	Range: SliderRange,
	Thumb: SliderThumb,
	HiddenInput: SliderHiddenInput,
	ValueText: SliderValueText,
	MarkerGroup: SliderMarkerGroup,
	Marker: SliderMarker,
	DraggingIndicator: SliderDraggingIndicator,
}

export const Slider = Object.assign(SliderRoot, sliderParts)
export {
	SliderRoot as Root,
	SliderLabel as Label,
	SliderControl as Control,
	SliderTrack as Track,
	SliderRange as Range,
	SliderThumb as Thumb,
	SliderHiddenInput as HiddenInput,
	SliderValueText as ValueText,
	SliderMarkerGroup as MarkerGroup,
	SliderMarker as Marker,
	SliderDraggingIndicator as DraggingIndicator,
}

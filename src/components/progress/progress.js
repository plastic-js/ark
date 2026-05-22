import { ProgressCircle } from './progress-circle.jsx'
import { ProgressCircleRange } from './progress-circle-range.jsx'
import { ProgressCircleTrack } from './progress-circle-track.jsx'
import { ProgressLabel } from './progress-label.jsx'
import { ProgressRange } from './progress-range.jsx'
import { ProgressRoot } from './progress-root.jsx'
import { ProgressTrack } from './progress-track.jsx'
import { ProgressValueText } from './progress-value-text.jsx'
import { ProgressView } from './progress-view.jsx'

const progressParts = {
	Root: ProgressRoot,
	Label: ProgressLabel,
	Track: ProgressTrack,
	Range: ProgressRange,
	ValueText: ProgressValueText,
	Circle: ProgressCircle,
	CircleTrack: ProgressCircleTrack,
	CircleRange: ProgressCircleRange,
	View: ProgressView,
}

export const Progress = Object.assign(ProgressRoot, progressParts)
export {
	ProgressRoot as Root,
	ProgressLabel as Label,
	ProgressTrack as Track,
	ProgressRange as Range,
	ProgressValueText as ValueText,
	ProgressCircle as Circle,
	ProgressCircleTrack as CircleTrack,
	ProgressCircleRange as CircleRange,
	ProgressView as View,
}

import { DateInputRoot } from './date-input-root.jsx'
import { DateInputLabel } from './date-input-label.jsx'
import { DateInputControl } from './date-input-control.jsx'
import { DateInputSegmentGroup } from './date-input-segment-group.jsx'
import { DateInputSegment } from './date-input-segment.jsx'
import { DateInputHiddenInput } from './date-input-hidden-input.jsx'

const dateInputParts = {
	Root: DateInputRoot,
	Label: DateInputLabel,
	Control: DateInputControl,
	SegmentGroup: DateInputSegmentGroup,
	Segment: DateInputSegment,
	HiddenInput: DateInputHiddenInput,
}

export const DateInput = Object.assign(DateInputRoot, dateInputParts)
export {
	DateInputRoot as Root,
	DateInputLabel as Label,
	DateInputControl as Control,
	DateInputSegmentGroup as SegmentGroup,
	DateInputSegment as Segment,
	DateInputHiddenInput as HiddenInput,
}

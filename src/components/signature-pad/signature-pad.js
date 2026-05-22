import { SignaturePadCanvas } from './signature-pad-canvas.jsx'
import { SignaturePadClearTrigger } from './signature-pad-clear-trigger.jsx'
import { SignaturePadControl } from './signature-pad-control.jsx'
import { SignaturePadGuide } from './signature-pad-guide.jsx'
import { SignaturePadHiddenInput } from './signature-pad-hidden-input.jsx'
import { SignaturePadLabel } from './signature-pad-label.jsx'
import { SignaturePadRoot } from './signature-pad-root.jsx'
import { SignaturePadSegment } from './signature-pad-segment.jsx'

const signaturePadParts = {
	Root: SignaturePadRoot,
	Label: SignaturePadLabel,
	Control: SignaturePadControl,
	Segment: SignaturePadSegment,
	Canvas: SignaturePadCanvas,
	Guide: SignaturePadGuide,
	HiddenInput: SignaturePadHiddenInput,
	ClearTrigger: SignaturePadClearTrigger,
}

export const SignaturePad = Object.assign(SignaturePadRoot, signaturePadParts)
export {
	SignaturePadRoot as Root,
	SignaturePadLabel as Label,
	SignaturePadControl as Control,
	SignaturePadSegment as Segment,
	SignaturePadCanvas as Canvas,
	SignaturePadGuide as Guide,
	SignaturePadHiddenInput as HiddenInput,
	SignaturePadClearTrigger as ClearTrigger,
}

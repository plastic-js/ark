import { ClipboardControl } from './clipboard-control.jsx'
import { ClipboardIndicator } from './clipboard-indicator.jsx'
import { ClipboardInput } from './clipboard-input.jsx'
import { ClipboardLabel } from './clipboard-label.jsx'
import { ClipboardRoot } from './clipboard-root.jsx'
import { ClipboardTrigger } from './clipboard-trigger.jsx'
import { ClipboardValueText } from './clipboard-value-text.jsx'

const clipboardParts = {
	Root: ClipboardRoot,
	Control: ClipboardControl,
	Indicator: ClipboardIndicator,
	Input: ClipboardInput,
	Label: ClipboardLabel,
	Trigger: ClipboardTrigger,
	ValueText: ClipboardValueText,
}

export const Clipboard = Object.assign(ClipboardRoot, clipboardParts)
export {
	ClipboardControl as Control,
	ClipboardIndicator as Indicator,
	ClipboardInput as Input,
	ClipboardLabel as Label,
	ClipboardRoot as Root,
	ClipboardTrigger as Trigger,
	ClipboardValueText as ValueText,
}

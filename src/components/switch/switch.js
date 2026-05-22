import { SwitchControl } from './switch-control.jsx'
import { SwitchHiddenInput } from './switch-hidden-input.jsx'
import { SwitchLabel } from './switch-label.jsx'
import { SwitchRoot } from './switch-root.jsx'
import { SwitchThumb } from './switch-thumb.jsx'

const switchParts = {
	Root: SwitchRoot,
	Label: SwitchLabel,
	Control: SwitchControl,
	Thumb: SwitchThumb,
	HiddenInput: SwitchHiddenInput,
}

export const Switch = Object.assign(SwitchRoot, switchParts)
export {
	SwitchControl as Control,
	SwitchHiddenInput as HiddenInput,
	SwitchLabel as Label,
	SwitchRoot as Root,
	SwitchThumb as Thumb,
}

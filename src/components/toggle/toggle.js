import { ToggleIndicator } from './toggle-indicator.jsx'
import { ToggleRoot } from './toggle-root.jsx'

const toggleParts = {
	Root: ToggleRoot,
	Indicator: ToggleIndicator,
}

export const Toggle = Object.assign(ToggleRoot, toggleParts)
export {
	ToggleIndicator as Indicator,
	ToggleRoot as Root,
}

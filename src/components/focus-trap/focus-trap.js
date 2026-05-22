import { FocusTrapRoot } from './focus-trap-root.jsx'

const focusTrapParts = {
	Root: FocusTrapRoot,
}

export const FocusTrap = Object.assign(FocusTrapRoot, focusTrapParts)
export { FocusTrapRoot as Root }

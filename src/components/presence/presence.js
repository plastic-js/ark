import { PresenceRoot } from './presence-root.jsx'

const presenceParts = {
	Root: PresenceRoot,
}

export const Presence = Object.assign(PresenceRoot, presenceParts)
export { PresenceRoot as Root }

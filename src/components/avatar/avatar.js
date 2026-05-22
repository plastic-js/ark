import { AvatarFallback } from './avatar-fallback.jsx'
import { AvatarImage } from './avatar-image.jsx'
import { AvatarRoot } from './avatar-root.jsx'

const avatarParts = {
	Root: AvatarRoot,
	Image: AvatarImage,
	Fallback: AvatarFallback,
}

export const Avatar = Object.assign(AvatarRoot, avatarParts)
export {
	AvatarFallback as Fallback,
	AvatarImage as Image,
	AvatarRoot as Root,
}

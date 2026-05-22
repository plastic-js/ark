import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useAvatarContext } from './avatar-context.js'

export const AvatarFallback = (props = {})=> {
	const avatarApi = useAvatarContext()
	return ark.span(mergeProps(()=> avatarApi().getFallbackProps(), props))
}

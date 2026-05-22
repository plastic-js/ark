import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useAvatarContext } from './avatar-context.js'

export const AvatarImage = (props = {})=> {
	const avatarApi = useAvatarContext()
	return ark.img(mergeProps(()=> avatarApi().getImageProps(), props))
}

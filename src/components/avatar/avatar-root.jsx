import * as avatar from '@zag-js/avatar'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { AvatarProvider } from './avatar-context.js'
import { useAvatar } from './use-avatar.js'

const splitAvatarProps = createSplitProps(avatar.props)

export const AvatarRoot = (props = {})=> {
	const [machineProps, elementProps] = splitAvatarProps(props)
	const avatarApi = useAvatar(machineProps)

	return AvatarProvider({
		value: avatarApi,
		children: ()=> ark.span(mergeProps(()=> avatarApi().getRootProps(), elementProps)),
	})
}

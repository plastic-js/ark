import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

const splitChannelInputProps = createSplitProps(['channel', 'orientation'])

export const ColorPickerChannelInput = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const [channelProps, elementProps] = splitChannelInputProps(props)
	return ark.input(mergeProps(()=> colorPicker().getChannelInputProps(channelProps), elementProps))
}

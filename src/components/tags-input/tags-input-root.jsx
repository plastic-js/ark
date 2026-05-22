import * as tagsInput from '@zag-js/tags-input'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { TagsInputProvider } from './tags-input-context.js'
import { useTagsInput } from './use-tags-input.js'

const splitTagsInputProps = createSplitProps(tagsInput.props)

export const TagsInputRoot = (props = {})=> {
	const [machineProps, elementProps] = splitTagsInputProps(props)
	const api = useTagsInput(machineProps)
	return TagsInputProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

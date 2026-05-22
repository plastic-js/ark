import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext, useTagsInputItemContext } from './tags-input-context.js'

export const TagsInputItemDeleteTrigger = (props = {})=> {
	const tagsInput = useTagsInputContext()
	const item = useTagsInputItemContext()
	return ark.button(mergeProps(tagsInput().getItemDeleteTriggerProps(item), props))
}

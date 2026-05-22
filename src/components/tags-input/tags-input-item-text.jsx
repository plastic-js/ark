import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext, useTagsInputItemContext } from './tags-input-context.js'

export const TagsInputItemText = (props = {})=> {
	const tagsInput = useTagsInputContext()
	const item = useTagsInputItemContext()
	return ark.div(mergeProps(tagsInput().getItemTextProps(item), props))
}

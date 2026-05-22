import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext, useTagsInputItemContext } from './tags-input-context.js'

export const TagsInputItemInput = (props = {})=> {
	const tagsInput = useTagsInputContext()
	const item = useTagsInputItemContext()
	return ark.input(mergeProps(tagsInput().getItemInputProps(item), props))
}

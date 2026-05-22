import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext } from './tags-input-context.js'

export const TagsInputLabel = (props = {})=> {
	const tagsInput = useTagsInputContext()
	return ark.label(mergeProps(tagsInput().getLabelProps(), props))
}

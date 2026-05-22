import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext } from './tags-input-context.js'

export const TagsInputInput = (props = {})=> {
	const tagsInput = useTagsInputContext()
	return ark.input(mergeProps(tagsInput().getInputProps(), props))
}

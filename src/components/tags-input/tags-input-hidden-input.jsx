import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext } from './tags-input-context.js'

export const TagsInputHiddenInput = (props = {})=> {
	const tagsInput = useTagsInputContext()
	return ark.input(mergeProps(()=> tagsInput().getHiddenInputProps(), props))
}

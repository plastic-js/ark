import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext } from './tags-input-context.js'

export const TagsInputControl = (props = {})=> {
	const tagsInput = useTagsInputContext()
	return ark.div(mergeProps(tagsInput().getControlProps(), props))
}

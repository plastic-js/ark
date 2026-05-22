import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTagsInputContext } from './tags-input-context.js'

export const TagsInputClearTrigger = (props = {})=> {
	const tagsInput = useTagsInputContext()
	return ark.button(mergeProps(tagsInput().getClearTriggerProps(), props))
}

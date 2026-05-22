import * as tagsInput from '@zag-js/tags-input'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { TagsInputItemProvider, useTagsInputContext } from './tags-input-context.js'

const splitItemProps = createSplitProps(tagsInput.itemProps)

export const TagsInputItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const api = useTagsInputContext()
	return TagsInputItemProvider({
		value: itemProps,
		children: ()=> ark.div(mergeProps(api().getItemProps(itemProps), localProps)),
	})
}

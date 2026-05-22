import * as toggleGroup from '@zag-js/toggle-group'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useToggleGroupContext } from './toggle-group-context.js'

const splitItemProps = createSplitProps(toggleGroup.itemProps)

export const ToggleGroupItem = (props = {})=> {
	const [itemProps, elementProps] = splitItemProps(props)
	const toggleGroupApi = useToggleGroupContext()

	return ark.button(mergeProps(()=> toggleGroupApi().getItemProps(itemProps), elementProps))
}

import * as select from '@zag-js/select'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSelectContext } from './select-context.js'

const splitGroupProps = createSplitProps(select.itemGroupProps)

export const SelectItemGroup = (props = {})=> {
	const [groupProps, localProps] = splitGroupProps(props)
	const select = useSelectContext()
	return ark.div(mergeProps(select().getItemGroupProps(groupProps), localProps))
}

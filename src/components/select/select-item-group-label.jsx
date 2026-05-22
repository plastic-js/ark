import * as select from '@zag-js/select'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSelectContext } from './select-context.js'

const splitGroupLabelProps = createSplitProps(select.itemGroupLabelProps)

export const SelectItemGroupLabel = (props = {})=> {
	const [groupLabelProps, localProps] = splitGroupLabelProps(props)
	const select = useSelectContext()
	return ark.div(mergeProps(select().getItemGroupLabelProps(groupLabelProps), localProps))
}

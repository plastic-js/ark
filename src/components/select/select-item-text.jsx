import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSelectContext, useSelectItemContext } from './select-context.js'

export const SelectItemText = (props = {})=> {
	const select = useSelectContext()
	const item = useSelectItemContext()
	return ark.div(mergeProps(()=> select().getItemTextProps(item()), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSelectContext } from './select-context.js'

export const SelectList = (props = {})=> {
	const select = useSelectContext()
	return ark.ul(mergeProps(()=> select().getListProps(), props))
}

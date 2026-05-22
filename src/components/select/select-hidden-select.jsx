import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSelectContext } from './select-context.js'

export const SelectHiddenSelect = (props = {})=> {
	const select = useSelectContext()
	return ark.select(mergeProps(()=> select().getHiddenSelectProps(), props))
}

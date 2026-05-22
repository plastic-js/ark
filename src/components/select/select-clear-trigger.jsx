import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSelectContext } from './select-context.js'

export const SelectClearTrigger = (props = {})=> {
	const select = useSelectContext()
	return ark.button(mergeProps(()=> select().getClearTriggerProps(), props))
}

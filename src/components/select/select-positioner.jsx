import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSelectContext } from './select-context.js'

export const SelectPositioner = (props = {})=> {
	const select = useSelectContext()
	return ark.div(mergeProps(()=> select().getPositionerProps(), props))
}

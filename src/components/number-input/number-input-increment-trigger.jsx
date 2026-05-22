import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useNumberInputContext } from './number-input-context.js'

export const NumberInputIncrementTrigger = (props = {})=> {
	const numberInput = useNumberInputContext()
	return ark.button(mergeProps(()=> numberInput().getIncrementTriggerProps(), props))
}

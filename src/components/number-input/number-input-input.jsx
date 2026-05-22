import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useNumberInputContext } from './number-input-context.js'

export const NumberInputInput = (props = {})=> {
	const numberInput = useNumberInputContext()
	return ark.input(mergeProps(()=> numberInput().getInputProps(), props))
}

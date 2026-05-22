import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useNumberInputContext } from './number-input-context.js'

export const NumberInputControl = (props = {})=> {
	const numberInput = useNumberInputContext()
	return ark.div(mergeProps(()=> numberInput().getControlProps(), props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useNumberInputContext } from './number-input-context.js'

export const NumberInputValueText = (props = {})=> {
	const numberInput = useNumberInputContext()
	return ark.div(mergeProps(()=> numberInput().getValueTextProps(), props))
}

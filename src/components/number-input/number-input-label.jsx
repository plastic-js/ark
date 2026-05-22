import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useNumberInputContext } from './number-input-context.js'

export const NumberInputLabel = (props = {})=> {
	const numberInput = useNumberInputContext()
	return ark.label(mergeProps(()=> numberInput().getLabelProps(), props))
}

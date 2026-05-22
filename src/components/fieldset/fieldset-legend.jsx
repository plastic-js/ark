import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useFieldsetContext } from './fieldset-context.js'

export const FieldsetLegend = (props = {})=> {
	const fieldset = useFieldsetContext()
	return ark.legend(mergeProps(fieldset.getLegendProps(), props))
}

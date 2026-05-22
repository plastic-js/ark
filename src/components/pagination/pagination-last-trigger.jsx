import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePaginationContext } from './pagination-context.js'

export const PaginationLastTrigger = (props = {})=> {
	const pagination = usePaginationContext()
	return ark.button(mergeProps(()=> pagination().getLastTriggerProps(), { type: 'button' }, props))
}

import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePaginationContext } from './pagination-context.js'

export const PaginationPrevTrigger = (props = {})=> {
	const pagination = usePaginationContext()
	return ark.button(mergeProps(()=> pagination().getPrevTriggerProps(), {
		type: 'button',
		...props,
	}))
}

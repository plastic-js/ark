import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePaginationContext } from './pagination-context.js'

export const PaginationNextTrigger = (props = {})=> {
	const pagination = usePaginationContext()
	return ark.button(mergeProps(()=> pagination().getNextTriggerProps(), {
		type: 'button',
		...props,
	}))
}

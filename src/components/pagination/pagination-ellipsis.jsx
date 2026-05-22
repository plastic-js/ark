import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePaginationContext } from './pagination-context.js'

const splitEllipsisProps = createSplitProps(['index', 'type'])

export const PaginationEllipsis = (props = {})=> {
	const [ellipsisProps, localProps] = splitEllipsisProps(props)
	const pagination = usePaginationContext()
	return ark.div(mergeProps(()=> pagination().getEllipsisProps({
		index: ellipsisProps.index ?? 0,
		type: ellipsisProps.type ?? 'ellipsis',
	}), localProps))
}

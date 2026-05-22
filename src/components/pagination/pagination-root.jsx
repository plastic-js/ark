import * as pagination from '@zag-js/pagination'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { PaginationProvider } from './pagination-context.js'
import { usePagination } from './use-pagination.js'

const splitPaginationProps = createSplitProps(pagination.props)

export const PaginationRoot = (props = {})=> {
	const [machineProps, elementProps] = splitPaginationProps(props)
	const api = usePagination(machineProps, elementProps.children)
	return PaginationProvider({
		value: api,
		children: ()=> ark.div(mergeProps(api().getRootProps(), elementProps)),
	})
}

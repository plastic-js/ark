import * as pagination from '@zag-js/pagination'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import { createUniqueId } from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

const visitPaginationChildren = (node, visitor)=> {
	if (Array.isArray(node)){
		node.forEach(child=> visitPaginationChildren(child, visitor))
		return
	}

	if (node == null || typeof node !== 'object'){
		return
	}

	visitor(node)
	visitPaginationChildren(node.children, visitor)
}

const getCountFromChildren = (children)=> {
	let inferredCount = 1

	visitPaginationChildren(children, (node)=> {
		if (!('tag' in node) || !('props' in node)){
			return
		}

		const value = Number(node.props?.value ?? node.props?.['data-page'])
		if (!Number.isNaN(value)){
			inferredCount = Math.max(inferredCount, value)
		}
	})

	return inferredCount
}

export const usePagination = (props = {}, children)=> {
	const id = createUniqueId('pagination')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(pagination.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...props,
		count: access(props.count) ?? getCountFromChildren(children),
		page: access(props.page),
		defaultPage: access(props.defaultPage),
		pageSize: access(props.pageSize) ?? 1,
		defaultPageSize: access(props.defaultPageSize) ?? 1,
		onPageChange: details=> props.onPageChange?.(details.page),
		onPageSizeChange: details=> props.onPageSizeChange?.(details.pageSize),
	}))

	return createComputed(()=> pagination.connect(service, normalizeProps))
}

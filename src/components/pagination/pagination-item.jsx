import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { usePaginationContext } from './pagination-context.js'

const splitItemProps = createSplitProps(['value', 'type', 'data-page'])

export const PaginationItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const pagination = usePaginationContext()
	const value = Number(itemProps.value ?? itemProps['data-page'])
	const resolvedItemProps = {
		value,
		type: itemProps.type ?? 'page',
	}
	return ark.button(mergeProps(()=> pagination().getItemProps(resolvedItemProps), {
		type: 'button',
		'aria-current': ()=> pagination().page === value ? 'page' : undefined,
		'data-selected': ()=> pagination().page === value ? '' : undefined,
		...localProps,
	}))
}

import { PaginationEllipsis } from './pagination-ellipsis.jsx'
import { PaginationFirstTrigger } from './pagination-first-trigger.jsx'
import { PaginationItem } from './pagination-item.jsx'
import { PaginationLastTrigger } from './pagination-last-trigger.jsx'
import { PaginationNextTrigger } from './pagination-next-trigger.jsx'
import { PaginationPrevTrigger } from './pagination-prev-trigger.jsx'
import { PaginationRoot } from './pagination-root.jsx'

const paginationParts = {
	Root: PaginationRoot,
	FirstTrigger: PaginationFirstTrigger,
	PrevTrigger: PaginationPrevTrigger,
	NextTrigger: PaginationNextTrigger,
	LastTrigger: PaginationLastTrigger,
	Item: PaginationItem,
	Ellipsis: PaginationEllipsis,
}

export const Pagination = Object.assign(PaginationRoot, paginationParts)
export {
	PaginationRoot as Root,
	PaginationFirstTrigger as FirstTrigger,
	PaginationPrevTrigger as PrevTrigger,
	PaginationNextTrigger as NextTrigger,
	PaginationLastTrigger as LastTrigger,
	PaginationItem as Item,
	PaginationEllipsis as Ellipsis,
}

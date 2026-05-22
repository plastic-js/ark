import { createContext } from '../../utils/index.js'

const [PaginationProvider, usePaginationContext] = createContext({
	strict: false,
	hookName: 'usePaginationContext',
	providerName: '<Pagination.Root />',
	defaultValue: null,
})

export { PaginationProvider, usePaginationContext }

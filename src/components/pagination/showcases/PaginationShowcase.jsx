import { Loop, createComputed, createSignal } from '../../../runtime.js'
import { css } from '@emotion/css'
import { Pagination } from '../../../index.js'

const tableClass = css({
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: '13px',
	'& th, & td': {
		textAlign: 'left',
		padding: '8px 10px',
		borderBottom: '1px solid rgba(29, 41, 53, 0.08)',
		verticalAlign: 'top',
	},
	'& th': {
		color: 'var(--muted)',
		fontSize: '11px',
		textTransform: 'uppercase',
		letterSpacing: '0.08em',
	},
})

const rows = [
	{
		id: 'U-001',
		name: 'Ada Lovelace',
		role: 'Analyst',
	},
	{
		id: 'U-002',
		name: 'Alan Turing',
		role: 'Cryptographer',
	},
	{
		id: 'U-003',
		name: 'Grace Hopper',
		role: 'Compiler Pioneer',
	},
	{
		id: 'U-004',
		name: 'Linus Torvalds',
		role: 'Kernel Engineer',
	},
	{
		id: 'U-005',
		name: 'Margaret Hamilton',
		role: 'Software Engineer',
	},
	{
		id: 'U-006',
		name: 'Donald Knuth',
		role: 'Author',
	},
	{
		id: 'U-007',
		name: 'Barbara Liskov',
		role: 'Researcher',
	},
	{
		id: 'U-008',
		name: 'Tim Berners-Lee',
		role: 'Web Architect',
	},
	{
		id: 'U-009',
		name: 'Dennis Ritchie',
		role: 'Language Designer',
	},
	{
		id: 'U-010',
		name: 'Ken Thompson',
		role: 'Systems Engineer',
	},
	{
		id: 'U-011',
		name: 'Edsger Dijkstra',
		role: 'Theorist',
	},
	{
		id: 'U-012',
		name: 'John Carmack',
		role: 'Graphics Engineer',
	},
]

const PAGE_SIZE = 3
const totalPages = Math.ceil(rows.length / PAGE_SIZE)
const pageList = Array.from({ length: totalPages }, (_, index)=> index + 1)

const PaginationShowcase = ()=> {
	const currentPage = createSignal(1)

	const visibleRows = createComputed(()=> {
		const start = (currentPage() - 1) * PAGE_SIZE
		return rows.slice(start, start + PAGE_SIZE)
	})

	const pageItems = pageList.map(page=> (
		<Pagination.Item data-page={page} key={page}>
			{page}
		</Pagination.Item>
	))

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Pagination</h1>
				<p className='hero-copy'>Live, component-specific demo for Pagination.</p>
			</header>
			<section className='feature-card'>
				<table className={tableClass}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
						<Loop each={visibleRows}>
							{row=> (
								<tr>
									<td>
										{row.id}
									</td>
									<td>
										{row.name}
									</td>
									<td>
										{row.role}
									</td>
								</tr>
							)}
						</Loop>
					</tbody>
				</table>
				<Pagination.Root count={rows.length} onPageChange={currentPage} page={currentPage} pageSize={PAGE_SIZE}>
					<div className='button-row'>
						<Pagination.FirstTrigger>«</Pagination.FirstTrigger>
						<Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
						{pageItems}
						<Pagination.NextTrigger>Next</Pagination.NextTrigger>
						<Pagination.LastTrigger>»</Pagination.LastTrigger>
					</div>
				</Pagination.Root>
				<code className='anatomy'>{`<Pagination.Root>
  <Pagination.FirstTrigger />
  <Pagination.PrevTrigger />
  <Pagination.Item />
  <Pagination.Ellipsis />
  <Pagination.NextTrigger />
  <Pagination.LastTrigger />
</Pagination.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default PaginationShowcase

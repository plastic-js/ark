import { createSignal } from '../../../runtime.js'
import { TreeView } from '../../../index.js'
import './TreeViewShowcase.css'

const TreeViewShowcase = ()=> {
	const expanded = createSignal([])
	const lastInteraction = createSignal('none')
	const focusedPart = createSignal('none')
	const focusedValue = createSignal('none')
	const formatExpanded = ()=> expanded().length ? expanded().join(', ') : '(empty)'
	const recordInteraction = (event)=> {
		const target = event.target instanceof Element ? event.target.closest?.('[data-part]') : null
		const part = target?.getAttribute('data-part') ?? 'unknown'
		const value = target?.getAttribute('data-value') ?? 'n/a'
		lastInteraction(`${part} / ${value}`)
	}
	const recordFocus = (event)=> {
		const activeSource = event?.target instanceof Element
			? event.target.closest?.('[data-part]') ?? event.target
			: document.activeElement instanceof Element ? document.activeElement.closest?.('[data-part]') ?? document.activeElement : null
		const activeElement = activeSource
		focusedPart(activeElement?.getAttribute?.('data-part') ?? activeElement?.tagName?.toLowerCase?.() ?? 'none')
		focusedValue(activeElement?.getAttribute?.('data-value') ?? 'n/a')
	}
	const handleClick = (event)=> {
		recordInteraction(event)
		recordFocus(event)
	}
	const handleFocusIn = (event)=> {
		recordFocus(event)
	}

	const treeCode = `<TreeView.Root>
  <TreeView.Branch value="...">
    <TreeView.BranchControl>
      <TreeView.BranchTrigger />
      <TreeView.BranchText />
    </TreeView.BranchControl>
    <TreeView.BranchContent>
      <TreeView.Item value="...">
        <TreeView.ItemText />
      </TreeView.Item>
    </TreeView.BranchContent>
  </TreeView.Branch>
</TreeView.Root>`

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>TreeView</h1>
				<p className='hero-copy'>Browse a taxonomy of sports categories with nested tree items.</p>
			</header>
			<section className='feature-card' onClick={handleClick} onFocusIn={handleFocusIn}>
				<TreeView.Root className='checklist sports-tree' expanded={expanded} onExpandedChange={expanded}>
					<TreeView.Branch value='ball-sports'>
						<TreeView.BranchControl>
							<TreeView.BranchTrigger>{'▶'}</TreeView.BranchTrigger>
							<TreeView.BranchText>Ball Sports</TreeView.BranchText>
						</TreeView.BranchControl>
						<TreeView.BranchContent>
							<TreeView.Item value='football'>
								<TreeView.ItemText>Football</TreeView.ItemText>
							</TreeView.Item>
							<TreeView.Item value='basketball'>
								<TreeView.ItemText>Basketball</TreeView.ItemText>
							</TreeView.Item>
							<TreeView.Branch value='racket-sports'>
								<TreeView.BranchControl>
									<TreeView.BranchTrigger>{'▶'}</TreeView.BranchTrigger>
									<TreeView.BranchText>Racket Sports</TreeView.BranchText>
								</TreeView.BranchControl>
								<TreeView.BranchContent>
									<TreeView.Item value='tennis'>
										<TreeView.ItemText>Tennis</TreeView.ItemText>
									</TreeView.Item>
									<TreeView.Item value='badminton'>
										<TreeView.ItemText>Badminton</TreeView.ItemText>
									</TreeView.Item>
								</TreeView.BranchContent>
							</TreeView.Branch>
							<TreeView.Branch value='water-sports'>
								<TreeView.BranchControl>
									<TreeView.BranchTrigger>{'▶'}</TreeView.BranchTrigger>
									<TreeView.BranchText>Water Sports</TreeView.BranchText>
								</TreeView.BranchControl>
								<TreeView.BranchContent>
									<TreeView.Item value='swimming'>
										<TreeView.ItemText>Swimming</TreeView.ItemText>
									</TreeView.Item>
									<TreeView.Item value='rowing'>
										<TreeView.ItemText>Rowing</TreeView.ItemText>
									</TreeView.Item>
								</TreeView.BranchContent>
							</TreeView.Branch>
						</TreeView.BranchContent>
					</TreeView.Branch>
				</TreeView.Root>
				<div className='checklist' style={{
					padding: '12px',
					borderRadius: '12px',
					background: 'rgba(15, 23, 42, 0.04)',
					border: '1px solid rgba(15, 23, 42, 0.08)',
					fontFamily: 'monospace',
					fontSize: '13px',
				}}>
					<div>expanded: <strong data-testid='tree-debug-expanded'>{formatExpanded()}</strong></div>
					<div>last click: <strong data-testid='tree-debug-click'>{lastInteraction}</strong></div>
					<div>focus part: <strong data-testid='tree-debug-focus-part'>{focusedPart}</strong></div>
					<div>focus value: <strong data-testid='tree-debug-focus-value'>{focusedValue}</strong></div>
				</div>
				<code className='anatomy'>{treeCode}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default TreeViewShowcase

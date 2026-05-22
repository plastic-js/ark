import { css } from '@emotion/css'
import { Tabs } from '../../../index.js'
import { createSignal } from '../../../runtime.js'

const tabsRootClass = css({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

const tabsListClass = css({
	position: 'relative',
	display: 'flex',
	gap: '4px',
	borderBottom: '1px solid rgba(29, 41, 53, 0.1)',
})

const tabsTriggerClass = css({
	padding: '10px 16px',
	background: 'transparent',
	border: 'none',
	borderRadius: '0',
	color: 'var(--muted)',
	fontSize: '14px',
	fontWeight: '600',
	cursor: 'pointer',
	'&[data-selected]': {
		background: 'transparent',
		color: 'var(--accent)',
	},
	'&:hover, &[data-selected]:hover, &:focus, &:focus-visible': {
		background: 'transparent',
		color: 'var(--accent)',
		transform: 'none',
		boxShadow: 'none',
		outline: 'none',
	},
})

const tabsIndicatorClass = css({
	height: '2px',
	background: 'var(--accent)',
	bottom: '-1px',
})

const tabsContentClass = css({
	padding: '12px 4px',
	color: 'var(--muted)',
	lineHeight: '1.6',
})

const TabsShowcase = ()=> {
	const value = createSignal('overview')

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Tabs</h1>
				<p className='hero-copy'>Live, component-specific demo for Tabs.</p>
			</header>
			<section className='feature-card'>
				<p>
					Current:
					{value}
				</p>
				<Tabs.Root className={tabsRootClass} onValueChange={value} value={value}>
					<Tabs.List className={tabsListClass}>
						<Tabs.Trigger className={tabsTriggerClass} value='overview'>Overview</Tabs.Trigger>
						<Tabs.Trigger className={tabsTriggerClass} value='specs'>Specs</Tabs.Trigger>
						<Tabs.Trigger className={tabsTriggerClass} value='reviews'>Reviews</Tabs.Trigger>
						<Tabs.Indicator className={tabsIndicatorClass} />
					</Tabs.List>
					<Tabs.Content className={tabsContentClass} value='overview'>
						<p>A quick look at the product highlights and key benefits.</p>
					</Tabs.Content>
					<Tabs.Content className={tabsContentClass} value='specs'>
						<p>Detailed technical specifications and dimensions.</p>
					</Tabs.Content>
					<Tabs.Content className={tabsContentClass} value='reviews'>
						<p>What other customers think after using the product.</p>
					</Tabs.Content>
				</Tabs.Root>
				<code className='anatomy'>{`<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger />
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content />
</Tabs.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default TabsShowcase

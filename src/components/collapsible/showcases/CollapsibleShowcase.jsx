import { createSignal } from '../../../runtime.js'
import { css } from '@emotion/css'
import { Collapsible } from '../../../index.js'

const triggerClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	background: 'transparent',
	border: 'none',
	color: 'var(--ink)',
	fontSize: '15px',
	fontWeight: '600',
	cursor: 'pointer',
	padding: '0',
	'&:hover': {
		background: 'transparent',
		color: 'var(--accent)',
		transform: 'none',
		boxShadow: 'none',
	},
})

const indicatorClass = css({
	display: 'inline-block',
	transition: 'transform 200ms ease',
	'&[data-state="open"]': {
		transform: 'rotate(90deg)',
	},
})

const CollapsibleShowcase = ()=> {
	const open = createSignal(true)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Collapsible</h1>
				<p className='hero-copy'>Live, component-specific demo for Collapsible.</p>
			</header>
			<section className='feature-card'>
				<Collapsible.Root onOpenChange={open} open={open}>
					<Collapsible.Trigger className={triggerClass}>
						<Collapsible.Indicator className={indicatorClass}>▶</Collapsible.Indicator>
						Toggle release notes
					</Collapsible.Trigger>
					<Collapsible.Content>
						<div className='checklist' style={{ marginTop: '10px' }}>Controlled disclosure with a signal.</div>
					</Collapsible.Content>
				</Collapsible.Root>
				<code className='anatomy'>{`<Collapsible.Root>
  <Collapsible.Trigger>
    <Collapsible.Indicator />
  </Collapsible.Trigger>
  <Collapsible.Content />
</Collapsible.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default CollapsibleShowcase

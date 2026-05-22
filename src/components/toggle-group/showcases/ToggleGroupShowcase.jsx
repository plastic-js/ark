import { createSignal } from '../../../runtime.js'
import { ToggleGroup } from '../../../index.js'
import { css } from '@emotion/css'

const toggleGroupRootClass = css({
	display: 'inline-flex',
	gap: '0',
	borderRadius: '12px',
	overflow: 'hidden',
	border: '2px solid rgba(59, 130, 246, 0.25)',
})

const toggleGroupItemClass = css({
	padding: '0.65rem 1.2rem',
	fontWeight: 600,
	fontSize: '0.95rem',
	borderRadius: '0',
	background: 'transparent',
	color: '#113355',
	cursor: 'pointer',
	borderRight: '1px solid rgba(59, 130, 246, 0.15)',
	transition: 'background 180ms ease, color 180ms ease',
	'&:last-child': {
		borderRight: 'none',
	},
	'&[data-state="on"]': {
		background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.14))',
		color: '#0f766e',
	},
	'&:hover': {
		background: 'rgba(59, 130, 246, 0.06)',
		transform: 'none',
		boxShadow: 'none',
	},
})

const ToggleGroupShowcase = ()=> {
	const value = createSignal(['bold'])

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>ToggleGroup</h1>
				<p className='hero-copy'>Live, component-specific demo for ToggleGroup.</p>
			</header>
			<section className='feature-card'>
				<h3>Text formatting</h3>
				<ToggleGroup.Root
					className={toggleGroupRootClass}
					value={value}
					onValueChange={(details)=> value(details)}
				>
					<ToggleGroup.Item className={toggleGroupItemClass} value='bold'>B</ToggleGroup.Item>
					<ToggleGroup.Item className={toggleGroupItemClass} value='italic'>I</ToggleGroup.Item>
					<ToggleGroup.Item className={toggleGroupItemClass} value='underline'>U</ToggleGroup.Item>
				</ToggleGroup.Root>
				<div className='checklist'>
					Active: {()=> value().join(', ')}
				</div>
				<code className='anatomy'>{`<ToggleGroup.Root>
  <ToggleGroup.Item value="bold" />
  <ToggleGroup.Item value="italic" />
</ToggleGroup.Root>`}</code>
			</section>
		</div>
	)
}

export default ToggleGroupShowcase

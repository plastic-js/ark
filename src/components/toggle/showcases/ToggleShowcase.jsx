import { createSignal } from '../../../runtime.js'
import { Toggle } from '../../../index.js'
import { css } from '@emotion/css'

const toggleRootClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '0.5rem',
	padding: '0.65rem 1.2rem',
	borderRadius: '999px',
	fontWeight: 600,
	fontSize: '0.95rem',
	border: '2px solid rgba(59, 130, 246, 0.3)',
	background: 'transparent',
	color: '#113355',
	cursor: 'pointer',
	transition: 'background 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
	'&[data-state="pressed"]': {
		background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.14))',
		borderColor: 'rgba(59, 130, 246, 0.6)',
		boxShadow: '0 6px 16px rgba(59, 130, 246, 0.18)',
	},
	'&:hover': {
		background: 'rgba(59, 130, 246, 0.06)',
		transform: 'none',
		boxShadow: 'none',
	},
})

const toggleIndicatorClass = css({
	display: 'inline-block',
	width: '0.6rem',
	height: '0.6rem',
	borderRadius: '50%',
	background: '#16a34a',
	opacity: 0,
	transform: 'scale(0.5)',
	transition: 'opacity 180ms ease, transform 180ms ease',
	[`[data-state="pressed"] &`]: {
		opacity: 1,
		transform: 'scale(1)',
	},
})

const ToggleShowcase = ()=> {
	const pressed = createSignal(false)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Toggle</h1>
				<p className='hero-copy'>Live, component-specific demo for Toggle.</p>
			</header>
			<section className='feature-card'>
				<h3>Toggle button</h3>
				<Toggle.Root
					className={toggleRootClass}
					pressed={pressed}
					onPressedChange={(next)=> pressed(next)}
				>
					<Toggle.Indicator className={toggleIndicatorClass} />
					{()=> pressed() ? 'Bold ON' : 'Bold OFF'}
				</Toggle.Root>
				<div className='checklist'>
					Pressed: {()=> pressed() ? 'yes' : 'no'}
				</div>
				<code className='anatomy'>{`<Toggle.Root>
  <Toggle.Indicator />
</Toggle.Root>`}</code>
			</section>
		</div>
	)
}

export default ToggleShowcase

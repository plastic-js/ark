import { createSignal } from '../../../runtime.js'
import { css, keyframes } from '@emotion/css'
import { FocusTrap } from '../../../index.js'

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
})

const slideUp = keyframes({
	from: { transform: 'translateY(24px) scale(0.97)', opacity: 0 },
	to: { transform: 'translateY(0) scale(1)', opacity: 1 },
})

const overlayClass = css({
	position: 'fixed',
	inset: '0',
	background: 'rgba(29, 41, 53, 0.55)',
	backdropFilter: 'blur(4px)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 9999,
	animation: `${fadeIn} 180ms ease`,
})

const boxClass = css({
	background: '#fff',
	borderRadius: '20px',
	padding: '28px 32px',
	maxWidth: '440px',
	width: 'calc(100% - 32px)',
	boxShadow: '0 32px 80px rgba(29, 41, 53, 0.22)',
	display: 'grid',
	gap: '16px',
	animation: `${slideUp} 200ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
})

const headerClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	'& strong': {
		flex: '1',
		fontSize: '1.05rem',
	},
})

const closeClass = css({
	width: '32px',
	height: '32px',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'transparent',
	color: 'var(--muted)',
	fontSize: '1.1rem',
	padding: '0',
	borderRadius: '50%',
	lineHeight: '1',
	'&:hover': {
		background: 'rgba(29, 41, 53, 0.08)',
		color: 'var(--ink)',
		transform: 'none',
		boxShadow: 'none',
	},
})

const FocusTrapShowcase = ()=> {
	const open = createSignal(false)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>FocusTrap</h1>
				<p className='hero-copy'>Live, component-specific demo for FocusTrap.</p>
			</header>
			<section className='feature-card'>
				<div className='button-row'>
					<button onClick={()=> open(true)} type='button'>Open trapped panel</button>
				</div>
				{()=> open()? (
						<div className={overlayClass} onClick={()=> open(false)}>
							<FocusTrap className={boxClass} onClick={event=> event.stopPropagation()}>
								<div className={headerClass}>
									<strong>FocusTrap active</strong>
									<button className={closeClass} onClick={()=> open(false)} type='button'>x</button>
								</div>
								<input placeholder='First input — Tab cycles inside this trap' />
								<input placeholder='Second input' autofocus />
								<select>
									<option>Option A</option>
									<option>Option B</option>
									<option>Option C</option>
								</select>
								<textarea placeholder='A textarea' rows='3' />
								<div style={{ display: 'flex', gap: '8px' }}>
									<button type='button'>Action 1</button>
									<button type='button'>Action 2</button>
								</div>
							</FocusTrap>
						</div>
					): null}
				<code className='anatomy'>{`<FocusTrap.Root />`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default FocusTrapShowcase

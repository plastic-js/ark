import { css } from '@emotion/css'
import { Portal, Tour } from '../../../index.js'

const backdropClass = css({
	position: 'fixed',
	inset: 0,
	background: 'rgba(29, 41, 53, 0.55)',
	backdropFilter: 'blur(4px)',
	zIndex: 0,
	'&[hidden]': {
		display: 'none',
	},
})

const positionerClass = css({
	position: 'fixed',
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '24px',
	pointerEvents: 'none',
})

const contentClass = css({
	pointerEvents: 'auto',
	background: '#ffffff',
	borderRadius: '20px',
	padding: '28px 32px',
	maxWidth: '440px',
	width: 'calc(100vw - 32px)',
	boxShadow: '0 32px 80px rgba(29, 41, 53, 0.22)',
	display: 'grid',
	gap: '14px',
	color: '#1d2935',
	'&[hidden]': {
		display: 'none',
	},
	'& h2': {
		fontSize: '1.2rem',
		margin: 0,
		letterSpacing: '-0.01em',
	},
	'& p': {
		margin: 0,
		color: '#586573',
		lineHeight: 1.65,
		fontSize: '0.95rem',
	},
})

const footerClass = css({
	display: 'flex',
	gap: '10px',
	marginTop: '8px',
	'& button': {
		padding: '10px 18px',
		fontSize: '14px',
		borderRadius: '999px',
	},
	'& button[data-type="close"]': {
		marginInlineStart: 'auto',
		background: 'transparent',
		color: '#586573',
		border: '1px solid rgba(29, 41, 53, 0.12)',
	},
	'& button[data-type="close"]:hover': {
		background: 'rgba(29, 41, 53, 0.05)',
		color: '#1d2935',
		boxShadow: 'none',
		transform: 'none',
	},
})

const TourShowcase = ()=> {
	const steps = [
		{ id: 'welcome', type: 'dialog', title: 'Welcome', description: 'This is a short guided tour.' },
		{ id: 'inspect', type: 'dialog', title: 'Inspect', description: 'Use prev/next to move through steps.' },
		{ id: 'done', type: 'dialog', title: 'Done', description: 'Close the tour from footer controls.' },
	]

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Tour</h1>
				<p className='hero-copy'>Live, component-specific demo for Tour.</p>
			</header>
			<section className='feature-card'>
				<Tour.Root steps={steps}>
					<div className='button-row'>
						<Tour.Trigger>Start tour</Tour.Trigger>
					</div>
					<Portal>
						<Tour.Backdrop className={backdropClass} />
						<Tour.Positioner className={positionerClass}>
							<Tour.Content className={contentClass}>
								<Tour.Title />
								<Tour.Description />
								<div className={footerClass}>
									<Tour.PrevTrigger>Prev</Tour.PrevTrigger>
									<Tour.NextTrigger>Next</Tour.NextTrigger>
									<Tour.CloseTrigger>Close</Tour.CloseTrigger>
								</div>
							</Tour.Content>
						</Tour.Positioner>
					</Portal>
				</Tour.Root>
				<code className='anatomy'>{`<Tour.Root>
  <Tour.Trigger />
  <Tour.Backdrop />
  <Tour.Positioner>
    <Tour.Content>
      <Tour.Title />
      <Tour.Description />
      <Tour.PrevTrigger />
      <Tour.NextTrigger />
      <Tour.CloseTrigger />
      <Tour.Arrow>
        <Tour.ArrowTip />
      </Tour.Arrow>
    </Tour.Content>
  </Tour.Positioner>
</Tour.Root>`}</code>
			</section>
		</div>
	)
}

export default TourShowcase

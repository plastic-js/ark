import { Steps } from '../../../index.js'
import { css } from '@emotion/css'

const stepsRootClass = css({
	display: 'grid',
	gap: '1.5rem',
	maxWidth: '480px',
})

const stepsProgressClass = css({
	height: '6px',
	borderRadius: '3px',
	background: '#e2e8f0',
	overflow: 'hidden',
	'&::after': {
		content: '""',
		display: 'block',
		height: '100%',
		borderRadius: '3px',
		background: 'linear-gradient(90deg, #3b82f6, #16a34a)',
		width: 'var(--percent)',
		transition: 'width 0.3s ease',
	},
})

const stepsListClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '0',
})

const stepsItemClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	padding: '0.5rem 1rem',
	borderRadius: '999px',
	fontSize: '0.85rem',
	fontWeight: 600,
	color: '#94a3b8',
	transition: 'color 0.2s',
	'&[aria-current="step"]': {
		background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.14))',
		color: '#0f766e',
	},
})

const stepsIndicatorClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '1.6rem',
	height: '1.6rem',
	borderRadius: '50%',
	fontSize: '0.75rem',
	fontWeight: 700,
	background: '#e2e8f0',
	color: '#64748b',
	transition: 'background 0.2s, color 0.2s',
	'&[data-current]': {
		background: '#0f766e',
		color: '#fff',
	},
	'&[data-complete]': {
		background: '#16a34a',
		color: '#fff',
	},
})

const stepsSeparatorClass = css({
	flex: 1,
	height: '2px',
	background: '#e2e8f0',
	minWidth: '2rem',
	transition: 'background 0.2s',
	'&[data-complete]': {
		background: '#16a34a',
	},
})

const stepsContentClass = css({
	padding: '1.25rem',
	borderRadius: '1rem',
	background: 'rgba(255, 255, 255, 0.7)',
	border: '1px solid rgba(29, 41, 53, 0.08)',
	minHeight: '120px',
	display: 'grid',
	gap: '0.75rem',
	fontSize: '0.95rem',
	color: '#113355',
	'&[hidden]': {
		display: 'none',
	},
})

const stepsTriggerClass = css({
	padding: '0',
	borderRadius: '999px',
	background: 'transparent',
	color: '#94a3b8',
	fontSize: '0.85rem',
	fontWeight: 600,
	boxShadow: 'none',
	cursor: 'pointer',
	transition: 'color 0.2s',
	'&:hover': {
		background: 'transparent',
		transform: 'none',
		boxShadow: 'none',
		color: '#113355',
	},
	'&[data-state="open"]': {
		color: '#0f766e',
	},
	'&[data-complete]': {
		color: '#16a34a',
	},
})

const navRowClass = css({
	display: 'flex',
	gap: '0.75rem',
	justifyContent: 'flex-end',
})

const navBtnClass = css({
	padding: '0.5rem 1.25rem',
	borderRadius: '8px',
	fontSize: '0.85rem',
	fontWeight: 600,
	border: '1px solid #d1d5db',
	background: '#fff',
	color: '#1d2935',
	cursor: 'pointer',
	transition: 'background 0.15s, border-color 0.15s',
	'&:hover:not(:disabled)': {
		background: '#f3f4f6',
		borderColor: '#9ca3af',
	},
	'&:disabled': {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
})

const StepsShowcase = ()=> (
	<div className='container'>
		<header className='hero'>
			<p className='eyebrow'>ark-plastic component showcase</p>
			<h1>Steps</h1>
			<p className='hero-copy'>Live, component-specific demo for Steps.</p>
		</header>
		<section className='feature-card'>
			<Steps.Root className={stepsRootClass} count={3} defaultStep={0}>
				<Steps.Progress className={stepsProgressClass} />
				<Steps.List className={stepsListClass}>
					<Steps.Item className={stepsItemClass} index={0}>
						<Steps.Indicator className={stepsIndicatorClass}>1</Steps.Indicator>
						<Steps.Trigger className={stepsTriggerClass}>Account</Steps.Trigger>
						<Steps.Separator className={stepsSeparatorClass} />
					</Steps.Item>
					<Steps.Item className={stepsItemClass} index={1}>
						<Steps.Indicator className={stepsIndicatorClass}>2</Steps.Indicator>
						<Steps.Trigger className={stepsTriggerClass}>Profile</Steps.Trigger>
						<Steps.Separator className={stepsSeparatorClass} />
					</Steps.Item>
					<Steps.Item className={stepsItemClass} index={2}>
						<Steps.Indicator className={stepsIndicatorClass}>3</Steps.Indicator>
						<Steps.Trigger className={stepsTriggerClass}>Confirm</Steps.Trigger>
					</Steps.Item>
				</Steps.List>
				<Steps.Content className={stepsContentClass} index={0}>
					<h3>Account</h3>
					<p>Enter your account details.</p>
				</Steps.Content>
				<Steps.Content className={stepsContentClass} index={1}>
					<h3>Profile</h3>
					<p>Set up your profile information.</p>
				</Steps.Content>
				<Steps.Content className={stepsContentClass} index={2}>
					<h3>Confirmation</h3>
					<p>Review and confirm your details.</p>
				</Steps.Content>
				<Steps.CompletedContent className={stepsContentClass}>
					<h3>All done!</h3>
					<p>You have completed all steps.</p>
				</Steps.CompletedContent>
				<div className={navRowClass}>
					<Steps.PrevTrigger className={navBtnClass}>Previous</Steps.PrevTrigger>
					<Steps.NextTrigger className={navBtnClass}>Next</Steps.NextTrigger>
				</div>
			</Steps.Root>
			<code className='anatomy'>{`<Steps.Root count={3}>
  <Steps.List>
    <Steps.Item index={0}>
      <Steps.Indicator />
      <Steps.Trigger />
      <Steps.Separator />
    </Steps.Item>
  </Steps.List>
  <Steps.Content index={0}>...</Steps.Content>
  <Steps.CompletedContent>...</Steps.CompletedContent>
  <Steps.PrevTrigger />
  <Steps.NextTrigger />
</Steps.Root>`}</code>
		</section>
	</div>
)

export default StepsShowcase

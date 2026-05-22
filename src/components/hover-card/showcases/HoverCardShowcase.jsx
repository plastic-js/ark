import { css } from '@emotion/css'
import { HoverCard } from '../../../index.js'

const demoStageClass = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '260px',
	padding: '64px 24px',
	borderRadius: '18px',
	background: 'rgba(255, 255, 255, 0.55)',
	border: '1px dashed rgba(29, 41, 53, 0.14)',
})

const triggerClass = css({
	padding: '10px 22px',
	fontSize: '14px',
	fontWeight: 500,
	borderRadius: '999px',
	border: '1px solid rgba(29, 41, 53, 0.12)',
	background: '#ffffff',
	color: '#1d2935',
	cursor: 'pointer',
	transition: 'transform 120ms ease, box-shadow 120ms ease',
	boxShadow: '0 6px 16px rgba(29, 41, 53, 0.08)',
	'&:hover, &:focus-visible': {
		transform: 'translateY(-1px)',
		boxShadow: '0 10px 22px rgba(29, 41, 53, 0.14)',
		outline: 'none',
	},
})

const contentClass = css({
	width: '280px',
	padding: '16px 18px',
	borderRadius: '14px',
	background: '#ffffff',
	color: '#1d2935',
	border: '1px solid rgba(29, 41, 53, 0.08)',
	boxShadow: '0 24px 60px rgba(29, 41, 53, 0.18)',
	display: 'grid',
	gap: '6px',
	'& strong': {
		fontSize: '14px',
		fontWeight: 700,
		letterSpacing: '-0.01em',
	},
	'& p': {
		margin: 0,
		fontSize: '13px',
		lineHeight: 1.55,
		color: '#586573',
	},
	'&[hidden]': {
		display: 'none',
	},
})

const HoverCardShowcase = ()=> {
	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>HoverCard</h1>
				<p className='hero-copy'>Live, component-specific demo for HoverCard.</p>
			</header>
			<section className='feature-card'>
				<div className={demoStageClass}>
					<HoverCard.Root>
						<HoverCard.Trigger className={triggerClass}>Hover for profile</HoverCard.Trigger>
						<HoverCard.Positioner>
							<HoverCard.Content className={contentClass}>
								<strong>ark-plastic maintainer</strong>
								<p>Builds no-virtual-DOM primitives.</p>
							</HoverCard.Content>
						</HoverCard.Positioner>
					</HoverCard.Root>
				</div>
				<code className='anatomy'>{`<HoverCard.Root>
  <HoverCard.Trigger />
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Arrow>
        <HoverCard.ArrowTip />
      </HoverCard.Arrow>
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard.Root>`}</code>
			</section>
		</div>
	)
}

export default HoverCardShowcase

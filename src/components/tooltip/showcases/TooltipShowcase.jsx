import { css } from '@emotion/css'
import { Tooltip } from '../../../index.js'

const demoStageClass = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '200px',
	padding: '48px 24px',
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
	maxWidth: '240px',
	padding: '8px 12px',
	borderRadius: '8px',
	background: '#1d2935',
	color: '#f7f8fa',
	fontSize: '13px',
	lineHeight: 1.5,
	boxShadow: '0 12px 28px rgba(29, 41, 53, 0.28)',
	'&[hidden]': {
		display: 'none',
	},
})

const checklistClass = css({
	margin: 0,
})

const TooltipShowcase = ()=> {
	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Tooltip</h1>
				<p className='hero-copy'>Live, component-specific demo for Tooltip.</p>
			</header>
			<section className='feature-card'>
				<p className='feature-copy'>Tooltip appears on hover and focus.</p>
				<div className={demoStageClass}>
					<Tooltip.Root>
						<Tooltip.Trigger className={triggerClass}>Hover me</Tooltip.Trigger>
						<Tooltip.Positioner>
							<Tooltip.Content className={contentClass}>
								<p className={checklistClass}>Tooltip anchors to its trigger with safe spacing.</p>
							</Tooltip.Content>
						</Tooltip.Positioner>
					</Tooltip.Root>
				</div>
				<code className='anatomy'>{`<Tooltip.Root>
  <Tooltip.Trigger />
  <Tooltip.Positioner>
    <Tooltip.Content>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>`}</code>
			</section>
		</div>
	)
}

export default TooltipShowcase

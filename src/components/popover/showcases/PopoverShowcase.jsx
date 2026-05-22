import { css } from '@emotion/css'
import { Popover, Portal } from '../../../index.js'

const demoStageClass = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '160px',
	padding: '24px',
	borderRadius: '18px',
	background: 'rgba(255, 255, 255, 0.55)',
	border: '1px dashed rgba(29, 41, 53, 0.14)',
})

const contentClass = css({
	display: 'grid',
	gap: '14px',
	width: '260px',
	padding: '18px 20px',
	borderRadius: '14px',
	background: '#ffffff',
	border: '1px solid rgba(29, 41, 53, 0.1)',
	boxShadow: '0 18px 42px rgba(29, 41, 53, 0.18)',
	color: '#1d2935',
	fontSize: '14px',
	lineHeight: 1.55,
	'&[hidden]': {
		display: 'none',
	},
	'& p': {
		margin: 0,
	},
})

const closeButtonClass = css({
	justifySelf: 'end',
	padding: '6px 14px',
	fontSize: '13px',
	borderRadius: '999px',
})

const PopoverShowcase = ()=> {
	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Popover</h1>
				<p className='hero-copy'>Live, component-specific demo for Popover.</p>
			</header>
			<section className='feature-card'>
				<p className='feature-copy'>Popover is dismissable and non-modal.</p>
				<div className={demoStageClass}>
					<Popover.Root positioning={{ placement: 'top', gutter: 8 }}>
						<Popover.Anchor />
						<Popover.Trigger>Open popover</Popover.Trigger>
						<Popover.Indicator />
						<Portal>
							<Popover.Positioner>
								<Popover.Content className={contentClass}>
									<Popover.Title>Details</Popover.Title>
									<Popover.Description>Popover anchors to its trigger and stays dismissable.</Popover.Description>
									<Popover.CloseTrigger className={closeButtonClass}>Close</Popover.CloseTrigger>
								</Popover.Content>
							</Popover.Positioner>
						</Portal>
					</Popover.Root>
				</div>
				<code className='anatomy'>{`<Popover.Root>
  <Popover.Anchor />
  <Popover.Trigger />
  <Popover.Indicator />
  <Popover.Positioner>
    <Popover.Arrow>
      <Popover.ArrowTip />
    </Popover.Arrow>
    <Popover.Content>
      <Popover.Title />
      <Popover.Description />
      <Popover.CloseTrigger />
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>`}</code>
			</section>
		</div>
	)
}

export default PopoverShowcase

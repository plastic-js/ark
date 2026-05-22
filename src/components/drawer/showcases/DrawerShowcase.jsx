import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { Drawer } from '../../../index.js'

const backdropClass = css({
	position: 'fixed',
	inset: 0,
	background: 'rgba(29, 41, 53, 0.55)',
	backdropFilter: 'blur(4px)',
	zIndex: 9998,
	'&[hidden]': {
		display: 'none',
	},
})

const positionerClass = css({
	position: 'fixed',
	inset: 0,
	display: 'flex',
	justifyContent: 'flex-end',
	pointerEvents: 'none',
	zIndex: 9999,
})

const contentClass = css({
	pointerEvents: 'auto',
	height: '100vh',
	width: 'min(360px, calc(100vw - 24px))',
	background: '#ffffff',
	padding: '28px 32px',
	boxShadow: '-24px 0 60px rgba(29, 41, 53, 0.22)',
	display: 'grid',
	gridAutoRows: 'max-content',
	gap: '14px',
	color: '#1d2935',
	'&[hidden]': {
		display: 'none',
	},
	'& h2': {
		fontSize: '1.15rem',
		margin: 0,
	},
	'& p': {
		margin: 0,
		color: '#586573',
		lineHeight: 1.6,
		fontSize: '0.95rem',
	},
})

const closeButtonClass = css({
	justifySelf: 'end',
	padding: '8px 16px',
	fontSize: '13px',
	borderRadius: '999px',
})

const DrawerShowcase = ()=> {
	const open = createSignal(false)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Drawer</h1>
				<p className='hero-copy'>Live, component-specific demo for Drawer.</p>
			</header>
			<section className='feature-card'>
				<Drawer.Root onOpenChange={open} open={open} placement='right'>
					<div className='button-row'>
						<Drawer.Trigger>Open drawer</Drawer.Trigger>
					</div>
					<Drawer.Backdrop className={backdropClass} />
					<Drawer.Positioner className={positionerClass}>
						<Drawer.Content className={contentClass}>
							<Drawer.Title>Side workspace</Drawer.Title>
							<Drawer.Description>Use drawers for secondary tasks without route changes.</Drawer.Description>
							<Drawer.CloseTrigger className={closeButtonClass}>Close</Drawer.CloseTrigger>
						</Drawer.Content>
					</Drawer.Positioner>
				</Drawer.Root>
				<code className='anatomy'>{`<Drawer.Root>
  <Drawer.Trigger />
  <Drawer.Backdrop />
  <Drawer.SwipeArea />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Grabber>
        <Drawer.GrabberIndicator />
      </Drawer.Grabber>
      <Drawer.Title />
      <Drawer.Description />
      <Drawer.CloseTrigger />
    </Drawer.Content>
    <Drawer.Indent>
      <Drawer.IndentBackground />
    </Drawer.Indent>
  </Drawer.Positioner>
</Drawer.Root>`}</code>
			</section>
		</div>
	)
}

export default DrawerShowcase

import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { Dialog, Portal } from '../../../index.js'

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
	alignItems: 'center',
	justifyContent: 'center',
	padding: '24px',
	zIndex: 9999,
})

const contentClass = css({
	background: '#ffffff',
	borderRadius: '20px',
	padding: '28px 32px',
	maxWidth: '420px',
	width: 'calc(100vw - 32px)',
	boxShadow: '0 32px 80px rgba(29, 41, 53, 0.22)',
	display: 'grid',
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

const DialogShowcase = ()=> {
	const open = createSignal(false)
	const openZIndex = createSignal(false)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Dialog</h1>
				<p className='hero-copy'>Live, component-specific demo for Dialog.</p>
			</header>
			<section className='feature-card'>
				<div className='button-row'>
					<button onClick={()=> { open(true); openZIndex(true) }}>Show 1 then 2</button>
					<button onClick={()=> { openZIndex(true); open(true) }}>Show 2 then 1</button>
				</div>
				{/* onFocusOutside preventDefault: 兩個 dialog 同時開啟時，關閉上層 dialog 會把焦點 restore 到它的 trigger，
				    那個 trigger 在下層 dialog 的 content 之外，會觸發下層的 focusOutside dismiss。
				    zag 的 onPointerDownOutside 有 isBelowPointerBlockingLayer 短路，但 onFocusOutside 沒有，
				    所以這裡手動 preventDefault 避免被連帶關閉。 */}
				<Dialog.Root onOpenChange={open} open={open} onFocusOutside={e => e.preventDefault()}>
					<div className='button-row'>
						<Dialog.Trigger>Open dialog</Dialog.Trigger>
					</div>
					<Portal>
						<Dialog.Backdrop className={backdropClass} />
						<Dialog.Positioner className={positionerClass}>
							<Dialog.Content className={contentClass}>
								<Dialog.Title>Keyboard-safe modal</Dialog.Title>
								<Dialog.Description>Escape and outside click both close this layer.</Dialog.Description>
								<Dialog.CloseTrigger className={closeButtonClass}>Close</Dialog.CloseTrigger>
							</Dialog.Content>
						</Dialog.Positioner>
					</Portal>
				</Dialog.Root>
				<Dialog.Root onOpenChange={openZIndex} open={openZIndex} zIndex={500} onFocusOutside={e => e.preventDefault()}>
					<div className='button-row'>
						<Dialog.Trigger>Open dialog (zIndex=500)</Dialog.Trigger>
					</div>
					<Portal>
						<Dialog.Backdrop className={backdropClass} />
						<Dialog.Positioner className={positionerClass}>
							<Dialog.Content className={contentClass}>
								<Dialog.Title>Custom z-index dialog</Dialog.Title>
								<Dialog.Description>Backdrop z-index: 500, positioner z-index: 501 — set via the zIndex prop on Dialog.Root.</Dialog.Description>
								<Dialog.CloseTrigger className={closeButtonClass}>Close</Dialog.CloseTrigger>
							</Dialog.Content>
						</Dialog.Positioner>
					</Portal>
				</Dialog.Root>
				<code className='anatomy'>{`<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>`}</code>
			</section>
		</div>
	)
}

export default DialogShowcase

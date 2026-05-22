import { Toast, createToaster } from '../../../index.js'

const toaster = createToaster({
	placement: 'bottom-end',
	overlap: true,
	gap: 16,
	// should be set globally to prevent overflow when the stack is expanded
	max: 12,
})

const toastStyle = {
	width: 'min(92vw, 340px)',
	borderRadius: '14px',
	border: '1px solid rgba(15, 118, 110, 0.22)',
	background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.98), rgba(239, 246, 245, 0.98))',
	boxShadow: '0 18px 45px rgba(29, 41, 53, 0.2)',
	backdropFilter: 'blur(4px)',
	overflow: 'hidden',
}

const toastInnerStyle = {
	padding: '14px 16px',
	display: 'grid',
	alignContent: 'start',
	gap: '8px',
	minHeight: '150px',
	boxSizing: 'border-box',
}

const titleStyle = {
	fontSize: '0.98rem',
	fontWeight: '700',
	letterSpacing: '-0.01em',
	color: '#0f172a',
	margin: 0,
}

const descriptionStyle = {
	fontSize: '0.9rem',
	lineHeight: '1.5',
	color: '#475569',
	margin: 0,
}

const closeButtonStyle = {
	background: '#0f766e',
	color: '#f7f7f5',
	border: 'none',
	padding: '8px 14px',
	borderRadius: '999px',
	fontSize: '0.85rem',
	fontWeight: '700',
	cursor: 'pointer',
}

const triggerButtonStyle = {
	background: '#ecfeff',
	color: '#0f766e',
	border: '1px solid rgba(15, 118, 110, 0.2)',
	padding: '10px 16px',
	borderRadius: '999px',
	fontSize: '0.9rem',
	fontWeight: '700',
	cursor: 'pointer',
}

const stackCss = `
[data-scope='toast'][data-part='root'] {
	translate: var(--x) var(--y);
	scale: var(--scale);
	z-index: var(--z-index);
	height: var(--height);
	opacity: var(--opacity);
	will-change: translate, opacity, scale;
	transition:
		translate 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
		scale 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
		opacity 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
		height 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
		box-shadow 200ms cubic-bezier(0.21, 1.02, 0.73, 1);
}
[data-scope='toast'][data-part='root'][data-state='closed'] {
	transition:
		translate 400ms cubic-bezier(0.06, 0.71, 0.55, 1),
		scale 400ms cubic-bezier(0.06, 0.71, 0.55, 1),
		opacity 200ms cubic-bezier(0.06, 0.71, 0.55, 1);
}
[data-scope='toast'][data-part='group']:hover [data-scope='toast'][data-part='root'][data-state='open'],
[data-scope='toast'][data-part='group']:focus-within [data-scope='toast'][data-part='root'][data-state='open'] {
	translate: var(--x) calc(var(--lift) * var(--offset));
	scale: 1;
	height: var(--initial-height);
}
[data-scope='toast'][data-part='close-trigger'] {
	align-self: start;
	line-height: 1;
	transform: none;
	box-shadow: none;
}
[data-scope='toast'][data-part='close-trigger']:hover,
[data-scope='toast'][data-part='close-trigger']:active {
	transform: none;
}
`

let counter = 0

const ToastShowcase = ()=> {
	const showToast = ()=> {
		counter += 1
		toaster.create({
			title: `Saved (${counter})`,
			description: 'Your draft is now synced.',
			type: 'success',
			duration: 25000,
		})
	}

	const showBurst = ()=> {
		for (let i = 0; i < 4; i += 1){
			counter += 1
			toaster.create({
				title: `Notification ${counter}`,
				description: 'Hover the stack to expand it.',
				type: 'info',
				duration: 25000,
			})
		}
	}

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Toast</h1>
				<p className='hero-copy'>Live, component-specific demo for Toast.</p>
			</header>
			<section className='feature-card'>
				<style>{stackCss}</style>
				<p className='hero-copy'>
					Click <strong>Show 4 toasts</strong> to fill the stack, then <strong>hover the toast group</strong> in the
					bottom-right corner to expand it into a list. Move the cursor away to collapse it back. Focusing any toast
					with the keyboard also expands the stack.
				</p>
				<div className='button-row'>
					<button onClick={showToast} style={triggerButtonStyle} type='button'>Show toast</button>
					<button onClick={showBurst} style={triggerButtonStyle} type='button'>Show 4 toasts</button>
				</div>
				<Toast.Toaster toaster={toaster}>
					{(t)=> (
						<Toast.Root style={toastStyle}>
							<div style={toastInnerStyle}>
								<Toast.Title style={titleStyle}>{t.title}</Toast.Title>
								<Toast.Description style={descriptionStyle}>{t.description}</Toast.Description>
								<Toast.CloseTrigger style={closeButtonStyle}>Dismiss</Toast.CloseTrigger>
							</div>
						</Toast.Root>
					)}
				</Toast.Toaster>
				<code className='anatomy'>{`<Toaster toaster={toaster}>
  {(toast) => (
    <Toast.Root>
      <Toast.Title />
      <Toast.Description />
      <Toast.CloseTrigger />
    </Toast.Root>
  )}
</Toaster>`}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default ToastShowcase

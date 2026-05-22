import { Clipboard } from '../../../index.js'
import { css } from '@emotion/css'

const clipboardRootClass = css({
	display: 'grid',
	gap: '0.75rem',
	maxWidth: '380px',
	padding: '1.25rem',
	borderRadius: '1rem',
	background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08))',
	border: '1px solid rgba(59, 130, 246, 0.2)',
})

const clipboardLabelClass = css({
	fontSize: '0.8rem',
	fontWeight: 700,
	textTransform: 'uppercase',
	letterSpacing: '0.08em',
	color: '#0f766e',
})

const clipboardControlClass = css({
	display: 'flex',
	gap: '0.5rem',
	alignItems: 'center',
})

const clipboardInputClass = css({
	flex: 1,
	padding: '0.55rem 0.75rem',
	borderRadius: '0.6rem',
	border: '1px solid rgba(29, 41, 53, 0.18)',
	background: 'rgba(255, 255, 255, 0.85)',
	fontSize: '0.9rem',
	color: '#113355',
	outline: 'none',
})

const clipboardTriggerClass = css({
	padding: '0.55rem 1rem',
	borderRadius: '0.6rem',
	fontSize: '0.85rem',
	fontWeight: 600,
})

const copiedTextClass = css({
	fontSize: '0.8rem',
	color: '#16a34a',
	fontWeight: 600,
})

const ClipboardShowcase = ()=> (
	<div className='container'>
		<header className='hero'>
			<p className='eyebrow'>ark-plastic component showcase</p>
			<h1>Clipboard</h1>
			<p className='hero-copy'>Live, component-specific demo for Clipboard.</p>
		</header>
		<section className='feature-card'>
			<Clipboard.Root className={clipboardRootClass} value='https://example.com/copy-link'>
				<Clipboard.Label className={clipboardLabelClass}>Share link</Clipboard.Label>
				<Clipboard.Control className={clipboardControlClass}>
					<Clipboard.Input className={clipboardInputClass} />
					<Clipboard.Trigger className={clipboardTriggerClass}>
						Copy
					</Clipboard.Trigger>
				</Clipboard.Control>
				<Clipboard.Indicator>
					<span className={copiedTextClass}>Copied to clipboard</span>
				</Clipboard.Indicator>
			</Clipboard.Root>
			<code className='anatomy'>{`<Clipboard.Root>
  <Clipboard.Label />
  <Clipboard.Control>
    <Clipboard.Input />
    <Clipboard.Trigger />
  </Clipboard.Control>
  <Clipboard.Indicator />
</Clipboard.Root>`}</code>
		</section>
	</div>
)

export default ClipboardShowcase

import { css } from '@emotion/css'

const portalBoxClass = css({
	padding: '1rem',
	borderRadius: '12px',
	background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.14))',
	border: '2px solid rgba(59, 130, 246, 0.25)',
	color: '#113355',
	fontWeight: 600,
})

const PortalShowcase = ()=> (
	<div className='container'>
		<header className='hero'>
			<p className='eyebrow'>ark-plastic component showcase</p>
			<h1>Portal</h1>
			<p className='hero-copy'>Live, component-specific demo for Portal.</p>
		</header>
		<section className='feature-card'>
			<p>
				Portal is a utility component that renders its children into a different DOM node
				(defaults to <code>document.body</code>). It has no visual representation of its own.
				It is used internally by components like Dialog, Popover, Tooltip, etc.
			</p>
			<code className='anatomy'>{`<Portal>
  <div>Rendered at the portal target</div>
</Portal>`}</code>
		</section>
	</div>
)

export default PortalShowcase

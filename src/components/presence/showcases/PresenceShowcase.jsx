import { createSignal } from '../../../runtime.js'
import { Presence } from '../../../index.js'

const PresenceShowcase = ()=> {
	const visible = createSignal(true)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Presence</h1>
				<p className='hero-copy'>Live, component-specific demo for Presence.</p>
			</header>
			<section className='feature-card'>
				<div className='button-row'>
					<button onClick={()=> visible(!visible())} type='button'>Toggle Presence</button>
				</div>
				<Presence present={visible}>
					<div className='checklist'>Presence keeps this panel mounted while visibility changes.</div>
				</Presence>
				<code className='anatomy'>{`<Presence.Root />`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default PresenceShowcase

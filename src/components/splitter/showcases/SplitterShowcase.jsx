import { createComputed, createSignal } from '../../../runtime.js'
import { css } from '@emotion/css'
import { Splitter } from '../../../index.js'

const splitPanelClass = css({
	padding: '14px',
	minHeight: '88px',
	background: 'rgba(255, 255, 255, 0.72)',
	border: '1px solid rgba(29, 41, 53, 0.08)',
	borderRadius: '16px',
})

const splitHandleClass = css({
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	minWidth: '44px',
	background: 'rgba(29, 41, 53, 0.08)',
	color: 'var(--ink)',
	borderRadius: '16px',
})

const SplitterShowcase = ()=> {
	const value = createSignal(40)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Splitter</h1>
				<p className='hero-copy'>Live, component-specific demo for Splitter.</p>
			</header>
			<section className='feature-card'>
				<Splitter.Root onValueChange={value} value={value}>
					<Splitter.Panel className={splitPanelClass} style={createComputed(()=> ({ flex: `0 0 ${value()}%` }))}>Primary pane</Splitter.Panel>
					<Splitter.ResizeTrigger className={splitHandleClass} tabIndex={0}>||</Splitter.ResizeTrigger>
					<Splitter.Panel className={splitPanelClass} style={createComputed(()=> ({ flex: `1 1 ${100 - value()}%` }))}>Secondary pane</Splitter.Panel>
				</Splitter.Root>
				<code className='anatomy'>{`<Splitter.Root>
  <Splitter.Panel />
  <Splitter.ResizeTrigger>
    <Splitter.ResizeTriggerIndicator />
  </Splitter.ResizeTrigger>
  <Splitter.Panel />
</Splitter.Root>`}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default SplitterShowcase

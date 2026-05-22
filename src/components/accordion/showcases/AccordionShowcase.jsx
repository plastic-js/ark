import { createSignal } from '../../../runtime.js'
import { css } from '@emotion/css'
import { Accordion } from '../../../index.js'

const acRootClass = css({
	display: 'flex',
	flexDirection: 'column',
})

const acItemClass = css({
	borderBottom: '1px solid rgba(29, 41, 53, 0.1)',
	'&:last-child': {
		borderBottom: 'none',
	},
})

const acTriggerClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	padding: '14px 0',
	background: 'transparent',
	border: 'none',
	borderRadius: '0',
	color: 'var(--ink)',
	fontSize: '15px',
	fontWeight: '600',
	cursor: 'pointer',
	textAlign: 'left',
	'&:hover': {
		background: 'transparent',
		color: 'var(--accent)',
		transform: 'none',
		boxShadow: 'none',
	},
})

const acIndicatorClass = css({
	fontSize: '18px',
	fontWeight: '300',
	transition: 'transform 200ms ease',
	'&[data-state="open"]': {
		transform: 'rotate(45deg)',
	},
})

const acContentClass = css({
	'& p': {
		padding: '0 0 14px 0',
		color: 'var(--muted)',
		lineHeight: '1.6',
	},
})

const AccordionShowcase = ()=> {
	const value = createSignal('shipping')

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Accordion</h1>
				<p className='hero-copy'>Live, component-specific demo for Accordion.</p>
			</header>
			<section className='feature-card'>
				<p>
					Current:
					{value}
				</p>
				<Accordion.Root className={acRootClass} onValueChange={value} value={value}>
					<Accordion.Item className={acItemClass} value='shipping'>
						<Accordion.Trigger className={acTriggerClass}>
							Shipping
							<Accordion.ItemIndicator className={acIndicatorClass}>+</Accordion.ItemIndicator>
						</Accordion.Trigger>
						<Accordion.Content className={acContentClass}>
							<p>Estimated delivery in 3-5 days.</p>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item className={acItemClass} value='returns'>
						<Accordion.Trigger className={acTriggerClass}>
							Returns
							<Accordion.ItemIndicator className={acIndicatorClass}>+</Accordion.ItemIndicator>
						</Accordion.Trigger>
						<Accordion.Content className={acContentClass}>
							<p>Returns accepted within 30 days.</p>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
				<code className='anatomy'>{`<Accordion.Root>
  <Accordion.Item>
    <Accordion.Trigger>
      <Accordion.ItemIndicator />
    </Accordion.Trigger>
    <Accordion.Content />
  </Accordion.Item>
</Accordion.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default AccordionShowcase

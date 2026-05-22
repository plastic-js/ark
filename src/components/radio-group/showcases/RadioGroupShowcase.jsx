import { createSignal } from '../../../runtime.js'
import { css } from '@emotion/css'
import { RadioGroup } from '../../../index.js'

const rgRootClass = css({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

const rgLabelClass = css({
	display: 'block',
	fontWeight: '600',
	fontSize: '0.95rem',
	color: '#1e293b',
	marginBottom: '8px',
})

const rgItemTextClass = css({
	fontSize: '0.95rem',
	color: '#334155',
})

const rgItemClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	cursor: 'pointer',
	padding: '10px 14px',
	borderRadius: '8px',
	border: '1px solid #e2e8f0',
	background: '#f8fafc',
	transition: 'background 0.15s, border-color 0.15s',
	width: '100%',
	boxSizing: 'border-box',
	'&[data-state="checked"]': {
		background: '#eff6ff',
		borderColor: '#3b82f6',
	},
	'&:hover': {
		background: '#f1f5f9',
	},
	[`&[data-state="checked"] .${rgItemTextClass}`]: {
		color: '#1e40af',
		fontWeight: '600',
	},
})

const rgControlClass = css({
	width: '18px',
	height: '18px',
	borderRadius: '50%',
	border: '2px solid #94a3b8',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: '0',
	transition: 'border-color 0.15s',
	background: 'transparent',
	padding: '0',
	'&[data-state="checked"]': {
		borderColor: '#3b82f6',
	},
})

const rgIndicatorClass = css({
	width: '8px',
	height: '8px',
	borderRadius: '50%',
	background: '#3b82f6',
	'&[data-state="unchecked"]': {
		display: 'none',
	},
})

const RadioGroupShowcase = ()=> {
	const value = createSignal('solid')

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>RadioGroup</h1>
				<p className='hero-copy'>Live, component-specific demo for RadioGroup.</p>
			</header>
			<section className='feature-card'>
				<RadioGroup.Root className={rgRootClass} name='runtime' onValueChange={value} value={value}>
					<RadioGroup.Label className={rgLabelClass}>Runtime choice</RadioGroup.Label>
					<RadioGroup.Item className={rgItemClass} value='solid'>
						<RadioGroup.ItemControl className={rgControlClass}>
							<RadioGroup.Indicator className={rgIndicatorClass} />
						</RadioGroup.ItemControl>
						<RadioGroup.ItemText className={rgItemTextClass}>Solid</RadioGroup.ItemText>
						<RadioGroup.ItemHiddenInput />
					</RadioGroup.Item>
					<RadioGroup.Item className={rgItemClass} value='plastic'>
						<RadioGroup.ItemControl className={rgControlClass}>
							<RadioGroup.Indicator className={rgIndicatorClass} />
						</RadioGroup.ItemControl>
						<RadioGroup.ItemText className={rgItemTextClass}>Plastic</RadioGroup.ItemText>
						<RadioGroup.ItemHiddenInput />
					</RadioGroup.Item>
				</RadioGroup.Root>
				<code className='anatomy'>{`<RadioGroup.Root>
  <RadioGroup.Label />
  <RadioGroup.Indicator />
  <RadioGroup.Item>
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText />
    <RadioGroup.ItemHiddenInput />
  </RadioGroup.Item>
</RadioGroup.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default RadioGroupShowcase

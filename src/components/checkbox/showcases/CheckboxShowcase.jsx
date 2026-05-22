import { createSignal } from '../../../runtime.js'
import { Checkbox } from '../../../index.js'
import { css } from '@emotion/css'

const checkboxRootClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '0.75rem',
	padding: '0.65rem 0.8rem',
	borderRadius: '0.8rem',
	background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.14))',
	border: '1px solid rgba(59, 130, 246, 0.25)',
})

const checkboxLabelClass = css({
	fontWeight: 600,
	color: '#113355',
	userSelect: 'none',
})

const checkboxControlClass = css({
	display: 'grid',
	placeItems: 'center',
	width: '1.5rem',
	height: '1.5rem',
	cursor: 'pointer',
	borderRadius: '0.45rem',
	backgroundColor: '#eff6ff',
	border: '1px solid #93c5fd',
	transition: 'background-color 180ms ease, border-color 180ms ease',
	'&[data-state="checked"]': {
		backgroundColor: '#16a34a',
		borderColor: '#15803d',
	},
})

const checkboxIndicatorClass = css({
	display: 'block',
	width: '0.7rem',
	height: '0.7rem',
	borderRadius: '0.2rem',
	backgroundColor: '#ffffff',
	boxShadow: '0 2px 6px rgba(15, 23, 42, 0.28)',
	transform: 'scale(0.55)',
	opacity: 0,
	transition: 'transform 180ms ease, opacity 180ms ease',
	'[data-state="checked"] &': {
		transform: 'scale(1)',
		opacity: 1,
	},
})

const CheckboxShowcase = ()=> {
	const checked = createSignal(true)
	const handleCheckedChange = nextChecked=> checked(!!nextChecked)
	const controlStyle = ()=> {
		if (!checked()){
			return undefined
		}

		return {
			backgroundColor: '#16a34a',
			borderColor: '#15803d',
		}
	}
	const indicatorStyle = ()=> ({
		transform: checked() ? 'scale(1)' : 'scale(0.55)',
		opacity: checked() ? 1 : 0,
	})

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Checkbox</h1>
				<p className='hero-copy'>Live, component-specific demo for Checkbox.</p>
			</header>
			<section className='feature-card'>
				<Checkbox.Root
					checked={checked}
					className={checkboxRootClass}
					onCheckedChange={handleCheckedChange}
				>
					<Checkbox.Control
						className={checkboxControlClass}
						style={controlStyle}
					>
						<Checkbox.Indicator
							className={checkboxIndicatorClass}
							style={indicatorStyle}
						/>
					</Checkbox.Control>
					<Checkbox.Label className={checkboxLabelClass}>Ship with analytics</Checkbox.Label>
					<Checkbox.HiddenInput name='analytics' />
				</Checkbox.Root>
				<div className='checklist'>
					Checked:
					{()=> checked() ? 'yes' : 'no'}
				</div>
				<code className='anatomy'>{`<Checkbox.Group>
  <Checkbox.Root>
    <Checkbox.Label />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</Checkbox.Group>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default CheckboxShowcase

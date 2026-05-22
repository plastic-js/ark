import { createSignal } from '../../../runtime.js'
import { Switch } from '../../../index.js'
import { css } from '@emotion/css'

const switchRootClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '0.75rem',
	padding: '0.65rem 0.8rem',
	borderRadius: '0.8rem',
	background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.14))',
	border: '1px solid rgba(59, 130, 246, 0.25)',
})

const switchLabelClass = css({
	fontWeight: 600,
	color: '#113355',
	userSelect: 'none',
})

const switchControlClass = css({
	position: 'relative',
	width: '3.25rem',
	height: '1.9rem',
	cursor: 'pointer',
	borderRadius: '999px',
	padding: '0.2rem',
	backgroundColor: '#bfdbfe',
	border: '1px solid #93c5fd',
	transition: 'background-color 180ms ease, border-color 180ms ease',
	'&[data-state="checked"]': {
		backgroundColor: '#16a34a',
		borderColor: '#15803d',
	},
})

const switchThumbClass = css({
	display: 'block',
	width: '1.45rem',
	height: '1.45rem',
	borderRadius: '50%',
	backgroundColor: '#ffffff',
	boxShadow: '0 2px 8px rgba(15, 23, 42, 0.3)',
	transform: 'translateX(0)',
	transition: 'transform 180ms ease',
	'[data-state="checked"] &': {
		transform: 'translateX(1.3rem)',
	},
})

const toChecked = (details)=> {
	if (details && typeof details === 'object' && 'checked' in details){
		return !!details.checked
	}

	return !!details
}

const SwitchShowcase = ()=> {
	const checked = createSignal(false)
	const handleCheckedChange = details=> checked(toChecked(details))
	const handleInputChange = event=> checked(!!event.currentTarget.checked)
	const controlStyle = ()=> {
		if (!checked()){
			return undefined
		}

		return {
			backgroundColor: '#16a34a',
			borderColor: '#15803d',
		}
	}
	const thumbStyle = ()=> ({ transform: checked() ? 'translateX(1.3rem)' : 'translateX(0)' })
	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Switch</h1>
				<p className='hero-copy'>Live, component-specific demo for Switch.</p>
			</header>
			<section className='feature-card'>
				<Switch.Root className={switchRootClass} onCheckedChange={handleCheckedChange}>
					<Switch.Label className={switchLabelClass}>Enable live previews</Switch.Label>
					<Switch.Control
						className={switchControlClass}
						style={controlStyle}
					>
						<Switch.Thumb
							className={switchThumbClass}
							style={thumbStyle}
						/>
					</Switch.Control>
					<Switch.HiddenInput name='live-preview' onChange={handleInputChange} />
				</Switch.Root>
				<div className='checklist'>
					Current state:
					{()=> checked() ? 'enabled' : 'disabled'}
				</div>
				<code className='anatomy'>{`<Switch.Root>
  <Switch.Label />
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.HiddenInput />
</Switch.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default SwitchShowcase

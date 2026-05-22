import { Checkbox, Fieldset } from '../../../index.js'

const FieldsetShowcase = ()=> {
	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Fieldset</h1>
				<p className='hero-copy'>Live, component-specific demo for Fieldset.</p>
			</header>
			<section className='feature-card'>
				<Fieldset.Root className='checklist'>
					<Fieldset.Legend>Notification channels</Fieldset.Legend>
					<Fieldset.HelperText>Fieldset groups controls under one legend.</Fieldset.HelperText>
					<Checkbox.Root>
						<Checkbox.Control>
							<Checkbox.Indicator />
						</Checkbox.Control>
						<Checkbox.Label>Email</Checkbox.Label>
					</Checkbox.Root>
				</Fieldset.Root>
				<code className='anatomy'>{`<Fieldset.Root>
  <Fieldset.Legend />
  <Fieldset.HelperText />
  <Fieldset.ErrorText />
</Fieldset.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default FieldsetShowcase

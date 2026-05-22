import { Field } from '../../../index.js'

const FieldShowcase = ()=> {
	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Field</h1>
				<p className='hero-copy'>Live, component-specific demo for Field.</p>
			</header>
			<section className='feature-card'>
				<Field.Root className='checklist'>
					<Field.Label>Email address</Field.Label>
					<Field.Input placeholder='you@example.com' type='email' />
					<Field.HelperText>Helper and input are linked by field context.</Field.HelperText>
				</Field.Root>
				<code className='anatomy'>{`<Field.Root>
  <Field.Label>
    <Field.RequiredIndicator />
  </Field.Label>
  <Field.Input />
  <Field.Textarea />
  <Field.Select />
  <Field.Item />
  <Field.HelperText />
  <Field.ErrorText />
</Field.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default FieldShowcase

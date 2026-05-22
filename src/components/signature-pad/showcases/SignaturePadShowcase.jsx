import { SignaturePad } from '../../../index.js'

const SignaturePadShowcase = ()=> {
	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>SignaturePad</h1>
				<p className='hero-copy'>Live, component-specific demo for SignaturePad.</p>
			</header>
			<section className='feature-card'>
				<SignaturePad.Root className='checklist'>
					<SignaturePad.Label>Signature</SignaturePad.Label>
					<SignaturePad.Control>
						<SignaturePad.Segment height={160} style={{ border: '1px solid #d7d7d7', borderRadius: '10px', width: '100%' }} width={360} />
						<SignaturePad.Guide />
						<div className='button-row'><SignaturePad.ClearTrigger>Clear signature</SignaturePad.ClearTrigger></div>
					</SignaturePad.Control>
					<SignaturePad.HiddenInput value='' />
				</SignaturePad.Root>
				<code className='anatomy'>{`<SignaturePad.Root>
  <SignaturePad.Label />
  <SignaturePad.Control>
    <SignaturePad.Segment />
    <SignaturePad.Guide />
    <SignaturePad.ClearTrigger />
  </SignaturePad.Control>
  <SignaturePad.HiddenInput />
</SignaturePad.Root>`}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default SignaturePadShowcase

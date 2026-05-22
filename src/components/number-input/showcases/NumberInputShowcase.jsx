import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { NumberInput } from '../../../index.js'

const controlStyle = css`
	display: flex;
	align-items: stretch;
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-radius: 8px;
	overflow: hidden;
	background: #1c1c1e;
`

const inputStyle = css`
	flex: 1;
	min-width: 0;
	background: transparent;
	color: #fff;
	border: none;
	border-radius: 0;
	padding: 10px 14px;
	font-size: 15px;
	outline: none;
`

const triggerGroupStyle = css`
	display: flex;
	flex-direction: column;
	border-left: 1px solid rgba(255, 255, 255, 0.15);
`

const triggerStyle = css`
	flex: 1;
	background: transparent;
	color: rgba(255, 255, 255, 0.7);
	border: none;
	border-radius: 0;
	padding: 0 10px;
	font-size: 12px;
	cursor: pointer;
	transition: background 150ms ease;
	line-height: 1;
	&:first-child {
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
	}
	&:hover {
		background: rgba(255, 255, 255, 0.08);
		transform: none;
		box-shadow: none;
	}
	&:active {
		background: rgba(255, 255, 255, 0.14);
	}
	&:disabled {
		opacity: 0.3;
		background: transparent;
	}
`

const NumberInputShowcase = ()=> {
	const value = createSignal(4)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>NumberInput</h1>
				<p className='hero-copy'>Live, component-specific demo for NumberInput.</p>
			</header>
			<section className='feature-card'>
				<NumberInput.Root
					getValueText={next=> `${next} reviewers`} max={10} min={0} onValueChange={value}
					step={1} value={value}
				>
					<NumberInput.Label>Reviewer count</NumberInput.Label>
					<NumberInput.Control className={controlStyle}>
						<NumberInput.Input className={inputStyle} />
						<div className={triggerGroupStyle}>
							<NumberInput.IncrementTrigger className={triggerStyle}>^</NumberInput.IncrementTrigger>
							<NumberInput.DecrementTrigger className={triggerStyle}>v</NumberInput.DecrementTrigger>
						</div>
					</NumberInput.Control>
					<NumberInput.ValueText />
				</NumberInput.Root>
				<code className='anatomy'>{`<NumberInput.Root>
  <NumberInput.Label />
  <NumberInput.ValueText />
  <NumberInput.Control>
    <NumberInput.Input />
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default NumberInputShowcase

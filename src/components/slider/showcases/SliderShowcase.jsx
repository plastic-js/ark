import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { Slider } from '../../../index.js'

const rootStyle = css`
	display: grid;
	gap: 12px;
`

const headerStyle = css`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 12px;
`

const labelStyle = css`
	font-size: 13px;
	font-weight: 700;
	color: var(--muted);
	letter-spacing: 0.06em;
	text-transform: uppercase;
`

const valueTextStyle = css`
	font-size: 14px;
	font-weight: 700;
	color: var(--accent);
	font-variant-numeric: tabular-nums;
`

const controlStyle = css`
	position: relative;
	display: flex;
	align-items: center;
	height: 20px;
`

const trackStyle = css`
	height: 6px;
	width: 100%;
	background: rgba(29, 41, 53, 0.12);
	border-radius: 999px;
`

const rangeStyle = css`
	height: 100%;
	background: var(--accent);
	border-radius: 999px;
`

const thumbStyle = css`
	width: 20px;
	height: 20px;
	padding: 0;
	border-radius: 50%;
	background: #fffaf3;
	border: 2px solid var(--accent);
	box-shadow: 0 4px 12px rgba(15, 118, 110, 0.28);
	cursor: grab;
	transition: box-shadow 140ms ease, background-color 140ms ease;

	&:hover {
		background: #ffffff;
		box-shadow: 0 6px 18px rgba(15, 118, 110, 0.42);
	}

	&[data-dragging] {
		cursor: grabbing;
		background: var(--accent);
		box-shadow: 0 6px 20px rgba(15, 118, 110, 0.5);
	}

	&:focus-visible {
		outline: 3px solid rgba(15, 118, 110, 0.32);
		outline-offset: 2px;
	}
`

const SliderShowcase = ()=> {
	const value = createSignal(35)
	const rangeValue = createSignal([20, 70])

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Slider</h1>
				<p className='hero-copy'>Live, component-specific demo for Slider.</p>
			</header>
			<section className='feature-card'>
				<Slider.Root
					className={rootStyle} getValueText={next=> `${next}%`} max={100} min={0}
					onValueChange={value} step={1} value={value}
				>
					<div className={headerStyle}>
						<Slider.Label className={labelStyle}>Release confidence</Slider.Label>
						<Slider.ValueText className={valueTextStyle} />
					</div>
					<Slider.Control className={controlStyle}>
						<Slider.Track className={trackStyle}>
							<Slider.Range className={rangeStyle} />
						</Slider.Track>
						<Slider.Thumb className={thumbStyle} />
					</Slider.Control>
				</Slider.Root>
				<Slider.Root
					className={rootStyle} getValueText={next=> Array.isArray(next) ? next.map(v=> `${v}%`).join(' – ') : `${next}%`}
					max={100} min={0} onValueChange={rangeValue} step={10} value={rangeValue}
				>
					<div className={headerStyle}>
						<Slider.Label className={labelStyle}>Range</Slider.Label>
						<Slider.ValueText className={valueTextStyle} />
					</div>
					<Slider.Control className={controlStyle}>
						<Slider.Track className={trackStyle}>
							<Slider.Range className={rangeStyle} />
						</Slider.Track>
						<Slider.Thumb className={thumbStyle} index={0} />
						<Slider.Thumb className={thumbStyle} index={1} />
					</Slider.Control>
				</Slider.Root>
				<code className='anatomy'>{`<Slider.Root>
  <Slider.Label />
  <Slider.ValueText />
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb>
      <Slider.HiddenInput />
    </Slider.Thumb>
    <Slider.DraggingIndicator />
  </Slider.Control>
  <Slider.MarkerGroup>
    <Slider.Marker value={0} />
    <Slider.Marker value={50} />
    <Slider.Marker value={100} />
  </Slider.MarkerGroup>
</Slider.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default SliderShowcase

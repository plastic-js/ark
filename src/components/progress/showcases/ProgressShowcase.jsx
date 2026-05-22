import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { Progress } from '../../../index.js'

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

const trackStyle = css`
	height: 8px;
	background: rgba(29, 41, 53, 0.12);
	border-radius: 999px;
	overflow: hidden;
`

const rangeStyle = css`
	height: 100%;
	background: var(--accent);
	border-radius: 999px;
	transition: width 200ms ease;
`

const ProgressShowcase = ()=> {
	const value = createSignal(60)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Progress</h1>
				<p className='hero-copy'>Live, component-specific demo for Progress.</p>
			</header>
			<section className='feature-card'>
				<Progress.Root
					className={rootStyle} getValueText={next=> `${next}% uploaded`} max={100}
					onValueChange={value}
					value={value}
				>
					<div className={headerStyle}>
						<Progress.Label className={labelStyle}>Upload progress</Progress.Label>
						<Progress.ValueText className={valueTextStyle} />
					</div>
					<Progress.Track className={trackStyle}>
						<Progress.Range className={rangeStyle} />
					</Progress.Track>
				</Progress.Root>
				<div className='button-row'>
					<button onClick={()=> value(Math.max(value() - 10, 0))} type='button'>-10%</button>
					<button onClick={()=> value(Math.min(value() + 10, 100))} type='button'>+10%</button>
				</div>
				<code className='anatomy'>{`<Progress.Root>
  <Progress.Label />
  <Progress.ValueText />
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
  <Progress.View state="loading">…</Progress.View>
  <Progress.View state="complete">Done</Progress.View>
  <Progress.Circle>
    <Progress.CircleTrack />
    <Progress.CircleRange />
  </Progress.Circle>
</Progress.Root>`}</code>
			</section>
		</div>
	)
}

export default ProgressShowcase

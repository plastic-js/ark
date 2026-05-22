import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { DateInput } from '../../../index.js'
import { useDateInputContext } from '../date-input-context.js'

const dateInputPanelStyle = css`
	display: grid;
	gap: 18px;
`

const previewShellStyle = css`
	display: grid;
	gap: 14px;
	padding: 18px;
	border-radius: 20px;
	border: 1px solid rgba(15, 118, 110, 0.14);
	background:
		linear-gradient(135deg, rgba(15, 118, 110, 0.08), rgba(249, 115, 22, 0.08)),
		rgba(255, 255, 255, 0.88);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
`

const previewMetaStyle = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	flex-wrap: wrap;
`

const helperTextStyle = css`
	color: var(--muted);
	font-size: 0.94rem;
	line-height: 1.6;
`

const valuePillStyle = css`
	display: inline-flex;
	align-items: center;
	padding: 7px 12px;
	border-radius: 999px;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	background: rgba(15, 118, 110, 0.12);
	color: var(--accent);
`

const dateInputStyle = css`
	&[data-part='control'] {
		display: inline-flex;
		align-items: center;
		min-width: min(100%, 360px);
		padding: 6px;
		border-radius: 18px;
		border: 1px solid rgba(29, 41, 53, 0.14);
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 12px 32px rgba(29, 41, 53, 0.08);
		transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
	}

	&[data-part='control']:focus-within {
		border-color: rgba(15, 118, 110, 0.42);
		box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.12), 0 16px 34px rgba(15, 118, 110, 0.12);
		transform: translateY(-1px);
	}

	& [data-part='segment-group'] {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		flex-wrap: wrap;
		font-variant-numeric: tabular-nums;
	}

	& [data-part='segment'] {
		display: block;
		min-width: 2ch;
		padding: 10px 8px;
		border-radius: 12px;
		color: var(--ink);
		outline: none;
		transition: background 160ms ease, color 160ms ease, box-shadow 160ms ease;
		text-align: center;
	}

	& [data-part='segment'][data-editable] {
		font-size: 1.15rem;
		font-weight: 700;
	}

	& [data-part='segment'][data-editable]:hover {
		background: rgba(15, 118, 110, 0.08);
	}

	& [data-part='segment'][data-editable]:focus,
	& [data-part='segment'][data-editable][data-focused] {
		background: rgba(15, 118, 110, 0.14);
		box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.28);
		color: #0b5f59;
	}

	& [data-part='segment'][data-type='literal'] {
		padding-inline: 2px;
		color: rgba(88, 101, 115, 0.85);
	}

	@media (max-width: 680px) {
		&[data-part='control'] {
			width: 100%;
			min-width: 0;
		}
	}
`

const DateInputSegments = ()=> {
	const dateInput = useDateInputContext()
	return ()=> dateInput().getSegments().map((segment, index)=> (
		<DateInput.Segment segment={segment} key={index} />
	))
}

const DateInputShowcase = ()=> {
	const value = createSignal('2026-05-02')

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>DateInput</h1>
				<p className='hero-copy'>Segment-based date entry with clearer focus treatment, readable numeric spacing, and a stronger field silhouette.</p>
			</header>
			<section className='feature-card'>
				<div className={dateInputPanelStyle}>
					<div className={previewShellStyle}>
						<div className={previewMetaStyle}>
							<p className={helperTextStyle}>Use Tab or arrow keys to move between month, day, and year segments.</p>
							<span className={valuePillStyle}>{()=> value() || 'No value'}</span>
						</div>
						<DateInput.Root onValueChange={value} value={value}>
							<DateInput.HiddenInput />
							<DateInput.Control className={dateInputStyle}>
								<DateInput.SegmentGroup>
									<DateInputSegments />
								</DateInput.SegmentGroup>
							</DateInput.Control>
						</DateInput.Root>
					</div>
					<div className='checklist'>
						<p>Focused segments get a tinted capsule so the active edit target is obvious.</p>
						<p>The current ISO value stays visible as a compact status pill for quick verification.</p>
					</div>
				</div>
				<code className='anatomy'>{`<DateInput.Root>
  <DateInput.Label />
  <DateInput.HiddenInput />
  <DateInput.Control>
    <DateInput.SegmentGroup>
      {segments.map(segment => (
        <DateInput.Segment segment={segment} />
      ))}
    </DateInput.SegmentGroup>
  </DateInput.Control>
</DateInput.Root>`}</code>
			</section>
		</div>
	)
}

export default DateInputShowcase

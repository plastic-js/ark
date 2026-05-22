import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { ColorPicker } from '../../../index.js'

const rootStyle = css`
	display: grid;
	gap: 12px;
`

const labelStyle = css`
	font-size: 13px;
	font-weight: 700;
	color: var(--muted);
	letter-spacing: 0.06em;
	text-transform: uppercase;
`

const controlStyle = css`
	display: flex;
	align-items: center;
	gap: 8px;
`

const triggerStyle = css`
	width: 36px;
	height: 36px;
	padding: 3px;
	border: 1px solid rgba(29, 41, 53, 0.16);
	border-radius: 8px;
	cursor: pointer;
	background: none;
	overflow: hidden;
`

const valueSwatch = css`
	width: 100%;
	height: 100%;
	border-radius: 5px;
`

const valueTextStyle = css`
	font-size: 14px;
	font-weight: 600;
	color: var(--ink);
	font-variant-numeric: tabular-nums;
`

const positionerStyle = css`
	z-index: 10;
`

const contentStyle = css`
	background: var(--panel);
	border: 1px solid var(--panel-border);
	border-radius: 16px;
	box-shadow: var(--shadow);
	padding: 16px;
	display: grid;
	gap: 12px;
	width: 240px;
`

const areaStyle = css`
	position: relative;
	height: 140px;
	border-radius: 8px;
	overflow: hidden;
`

const areaThumbStyle = css`
	width: 14px;
	height: 14px;
	border-radius: 50%;
	border: 2px solid #fff;
	box-shadow: 0 1px 4px rgba(0,0,0,0.4);
	transform: translate(-50%, -50%);
`

const sliderRowStyle = css`
	display: flex;
	align-items: center;
	gap: 8px;
`

const channelLabelStyle = css`
	font-size: 11px;
	font-weight: 700;
	color: var(--muted);
	letter-spacing: 0.08em;
	text-transform: uppercase;
	width: 12px;
`

const sliderStyle = css`
	flex: 1;
	position: relative;
	display: flex;
	align-items: center;
	height: 16px;
`

const sliderTrackStyle = css`
	width: 100%;
	height: 8px;
	border-radius: 999px;
	overflow: hidden;
`

const transparencyGridStyle = css`
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	height: 8px;
	border-radius: 999px;
	pointer-events: none;
	transform: translateY(-50%);
`

const sliderThumbStyle = css`
	position: absolute;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 2px solid #fff;
	box-shadow: 0 1px 4px rgba(0,0,0,0.35);
	transform: translate(-50%, -50%);
	cursor: grab;
	background: none;

	&[data-dragging] {
		cursor: grabbing;
	}
`

const channelInputStyle = css`
	width: 52px;
	font-size: 12px;
	font-variant-numeric: tabular-nums;
	text-align: center;
	border: 1px solid var(--panel-border);
	border-radius: 6px;
	padding: 3px 6px;
	background: none;
`

const eyeDropperStyle = css`
	font-size: 12px;
	padding: 6px 10px;
	border: 1px solid var(--panel-border);
	border-radius: 8px;
	cursor: pointer;
	background: none;
	color: var(--muted);

	&:hover {
		background: rgba(29, 41, 53, 0.04);
	}
`

const swatchGroupStyle = css`
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
`

const swatchTriggerStyle = css`
	width: 24px;
	height: 24px;
	border-radius: 6px;
	border: 1px solid rgba(29,41,53,0.12);
	cursor: pointer;
	position: relative;
	padding: 0;
`

const swatchIndicatorStyle = css`
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 12px;
	font-weight: 700;

	&[data-state='unchecked'] {
		display: none;
	}
`

const PRESET_SWATCHES = ['#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#0f766e', '#3182ce', '#805ad5', '#d53f8c']

const ColorPickerShowcase = ()=> {
	const color = createSignal('#0f766e')

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>ColorPicker</h1>
				<p className='hero-copy'>Live, component-specific demo for ColorPicker.</p>
			</header>

			<section className='feature-card'>
				<ColorPicker.Root className={rootStyle} onValueChange={color} value={color}>
					<ColorPicker.Label className={labelStyle}>Accent color</ColorPicker.Label>

					<ColorPicker.Control className={controlStyle}>
						<ColorPicker.Trigger className={triggerStyle}>
							<ColorPicker.ValueSwatch className={valueSwatch} />
						</ColorPicker.Trigger>
						<ColorPicker.ValueText className={valueTextStyle} />
					</ColorPicker.Control>

					<ColorPicker.Positioner className={positionerStyle}>
						<ColorPicker.Content className={contentStyle}>

							<ColorPicker.Area className={areaStyle}>
								{/* Zag injects inline layout styles here, so the showcase uses an inline override to keep the background stretched to the full area. */}
								<ColorPicker.AreaBackground style={{ inset: 0, position: 'absolute' }} />
								<ColorPicker.AreaThumb className={areaThumbStyle} />
							</ColorPicker.Area>

							<div className={sliderRowStyle}>
								{/* Keep the label outside the slider root so it does not change the slider's layout box and throw off thumb alignment. */}
								<span className={channelLabelStyle}>H</span>
								<ColorPicker.ChannelSlider channel='hue' className={sliderStyle}>
									<ColorPicker.ChannelSliderTrack className={sliderTrackStyle} />
									<ColorPicker.ChannelSliderThumb className={sliderThumbStyle} />
								</ColorPicker.ChannelSlider>
								<ColorPicker.ChannelInput channel='hue' className={channelInputStyle} />
							</div>

							<div className={sliderRowStyle}>
								{/* Same reason as hue: the visible label stays separate from the slider's hitbox and positioning math. */}
								<span className={channelLabelStyle}>A</span>
								<ColorPicker.ChannelSlider channel='alpha' className={sliderStyle}>
									<ColorPicker.ChannelSliderTrack className={sliderTrackStyle} />
									{/* Zag also injects inline sizing for the checkerboard, so the showcase pins it to the visible 8px track. */}
									<ColorPicker.TransparencyGrid
										className={transparencyGridStyle}
										style={{ height: '8px', left: 0, position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
									/>
									<ColorPicker.ChannelSliderThumb className={sliderThumbStyle} />
								</ColorPicker.ChannelSlider>
								<ColorPicker.ChannelInput channel='alpha' className={channelInputStyle} />
							</div>

							<ColorPicker.SwatchGroup className={swatchGroupStyle}>
								{PRESET_SWATCHES.map(swatch=> (
									<ColorPicker.SwatchTrigger
										key={swatch}
										className={swatchTriggerStyle}
										style={{ background: swatch }}
										value={swatch}
									>
										<ColorPicker.SwatchIndicator className={swatchIndicatorStyle}>✓</ColorPicker.SwatchIndicator>
									</ColorPicker.SwatchTrigger>
								))}
							</ColorPicker.SwatchGroup>

							<ColorPicker.EyeDropperTrigger className={eyeDropperStyle}>
								Pick from screen
							</ColorPicker.EyeDropperTrigger>

							<ColorPicker.HiddenInput />
						</ColorPicker.Content>
					</ColorPicker.Positioner>
				</ColorPicker.Root>

				<code className='anatomy'>{`<ColorPicker.Root>
  <ColorPicker.Label />
  <ColorPicker.Control>
    <ColorPicker.Trigger>
      <ColorPicker.ValueSwatch />
    </ColorPicker.Trigger>
    <ColorPicker.ValueText />
  </ColorPicker.Control>
  <ColorPicker.Positioner>
    <ColorPicker.Content>
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderLabel />
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
        <ColorPicker.ChannelSliderValueText />
      </ColorPicker.ChannelSlider>
      <ColorPicker.ChannelSlider channel="alpha">
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <ColorPicker.ChannelInput channel="hue" />
      <ColorPicker.SwatchGroup>
        <ColorPicker.SwatchTrigger value="#e53e3e">
          <ColorPicker.SwatchIndicator />
        </ColorPicker.SwatchTrigger>
      </ColorPicker.SwatchGroup>
      <ColorPicker.EyeDropperTrigger />
      <ColorPicker.FormatSelect />
      <ColorPicker.HiddenInput />
    </ColorPicker.Content>
  </ColorPicker.Positioner>
</ColorPicker.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default ColorPickerShowcase

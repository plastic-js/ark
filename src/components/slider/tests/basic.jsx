import { Slider } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Slider.Root defaultValue={20} max={100} min={0} step={10} {...props}>
    <Slider.Label>Volume</Slider.Label>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
    <Slider.HiddenInput />
    <Slider.ValueText />
  </Slider.Root>
)

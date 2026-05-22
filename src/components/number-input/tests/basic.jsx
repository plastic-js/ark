import { NumberInput } from '../index.js'

export const ComponentUnderTest = (props) => (
  <NumberInput.Root defaultValue={4} max={10} min={0} step={2} {...props}>
    <NumberInput.Label>Count</NumberInput.Label>
    <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
    <NumberInput.Input />
    <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
    <NumberInput.ValueText />
  </NumberInput.Root>
)

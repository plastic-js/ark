import { Checkbox } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Checkbox.Root {...props}>
    <Checkbox.Label>Accept terms</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.HiddenInput name="terms" />
  </Checkbox.Root>
)

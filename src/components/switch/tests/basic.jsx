import { Switch } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Switch.Root {...props}>
    <Switch.Label>Notifications</Switch.Label>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.HiddenInput name="notifications" />
  </Switch.Root>
)

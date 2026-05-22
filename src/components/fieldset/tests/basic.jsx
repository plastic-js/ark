import { Fieldset } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Fieldset.Root {...props}>
    <Fieldset.Legend>Preferences</Fieldset.Legend>
    <Fieldset.HelperText>Choose one option</Fieldset.HelperText>
    <Fieldset.ErrorText>Selection required</Fieldset.ErrorText>
  </Fieldset.Root>
)

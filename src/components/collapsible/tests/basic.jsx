import { Collapsible } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Collapsible.Root {...props}>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Body</Collapsible.Content>
  </Collapsible.Root>
)

import { Accordion } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Accordion.Root defaultValue="a" {...props}>
    <Accordion.Item value="a">
      <Accordion.Trigger>First</Accordion.Trigger>
      <Accordion.Content>Alpha</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="b">
      <Accordion.Trigger>Second</Accordion.Trigger>
      <Accordion.Content>Beta</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
)

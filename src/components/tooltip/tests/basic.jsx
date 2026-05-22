import { Tooltip } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Tooltip.Root openDelay={0} closeDelay={0} {...props}>
    <Tooltip.Trigger>Hover</Tooltip.Trigger>
    <Tooltip.Content>Helpful text</Tooltip.Content>
  </Tooltip.Root>
)

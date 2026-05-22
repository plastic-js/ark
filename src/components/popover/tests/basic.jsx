import { Popover } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Popover.Root {...props}>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Indicator />
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

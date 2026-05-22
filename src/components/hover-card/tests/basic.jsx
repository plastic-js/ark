import { HoverCard } from '../index.js'

export const ComponentUnderTest = (props) => (
  <HoverCard.Root openDelay={0} closeDelay={0} {...props}>
    <HoverCard.Trigger>Profile</HoverCard.Trigger>
    <HoverCard.Content>Details</HoverCard.Content>
  </HoverCard.Root>
)

import { Drawer } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Drawer.Root {...props}>
    <Drawer.Trigger>Open drawer</Drawer.Trigger>
    <Drawer.Backdrop />
    <Drawer.Positioner>
      <Drawer.Content>
        <Drawer.Title>Drawer title</Drawer.Title>
        <Drawer.Description>Drawer body</Drawer.Description>
        <Drawer.CloseTrigger>Close</Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)

import { Menu } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Menu.Root {...props}>
    <Menu.Trigger>Open</Menu.Trigger>
    <Menu.Content>
      <Menu.Item value="archive">
        <Menu.ItemText>Archive</Menu.ItemText>
      </Menu.Item>
      <Menu.Item value="delete">
        <Menu.ItemText>Delete</Menu.ItemText>
      </Menu.Item>
    </Menu.Content>
  </Menu.Root>
)

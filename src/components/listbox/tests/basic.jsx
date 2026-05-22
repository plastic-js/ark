import { Listbox } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Listbox.Root {...props}>
    <Listbox.Label>Fruits</Listbox.Label>
    <Listbox.Content>
      <Listbox.ItemGroup>
        <Listbox.ItemGroupLabel>Fresh</Listbox.ItemGroupLabel>
        <Listbox.Item value="apple">
          <Listbox.ItemText>Apple</Listbox.ItemText>
        </Listbox.Item>
        <Listbox.Item value="banana">
          <Listbox.ItemText>Banana</Listbox.ItemText>
        </Listbox.Item>
      </Listbox.ItemGroup>
      <Listbox.Item value="cherry">
        <Listbox.ItemText>Cherry</Listbox.ItemText>
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
)

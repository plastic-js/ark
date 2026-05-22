import { Combobox } from '../index.js'
import { ListCollection } from '@zag-js/collection'

const defaultCollection = new ListCollection({
  items: [
    { label: 'Ada', value: 'ada' },
    { label: 'Grace', value: 'grace' },
  ],
})

export const ComponentUnderTest = ({ collection = defaultCollection, ...props }) => (
  <Combobox.Root collection={collection} {...props}>
    <Combobox.Label>Assignee</Combobox.Label>
    <Combobox.Input />
    <Combobox.Trigger>Open</Combobox.Trigger>
    <Combobox.Content>
      {collection.items.map((item) => (
        <Combobox.Item key={item.value} item={collection.find(item.value)}>
          <Combobox.ItemText>{item.label}</Combobox.ItemText>
        </Combobox.Item>
      ))}
    </Combobox.Content>
  </Combobox.Root>
)

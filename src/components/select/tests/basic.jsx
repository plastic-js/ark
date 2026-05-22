import { Select } from '../index.js'
import { ListCollection } from '@zag-js/collection'

const defaultCollection = new ListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
  ],
})

export const ComponentUnderTest = ({ collection = defaultCollection, ...props }) => (
  <Select.Root collection={collection} {...props}>
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText />
        <Select.Indicator />
      </Select.Trigger>
    </Select.Control>
    <Select.HiddenSelect />
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={collection.find(item.value)}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
  </Select.Root>
)

import { TagsInput } from '../index.js'

export const ComponentUnderTest = (props) => (
  <TagsInput.Root defaultValue={['alpha', 'beta']} {...props}>
    <TagsInput.Label>Tags</TagsInput.Label>
    <TagsInput.Control>
      <TagsInput.Item value="alpha">
        <TagsInput.ItemText>alpha</TagsInput.ItemText>
      </TagsInput.Item>
      <TagsInput.Item value="beta">
        <TagsInput.ItemText>beta</TagsInput.ItemText>
      </TagsInput.Item>
      <TagsInput.Input />
    </TagsInput.Control>
    <TagsInput.ClearTrigger>Clear</TagsInput.ClearTrigger>
  </TagsInput.Root>
)

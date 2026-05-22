import { RadioGroup } from '../index.js'

export const ComponentUnderTest = (props) => (
  <RadioGroup.Root defaultValue="react" name="framework" {...props}>
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Item value="react">
      <RadioGroup.ItemControl>
        <RadioGroup.Indicator />
      </RadioGroup.ItemControl>
      <RadioGroup.ItemText>React</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
    <RadioGroup.Item value="solid">
      <RadioGroup.ItemControl>
        <RadioGroup.Indicator />
      </RadioGroup.ItemControl>
      <RadioGroup.ItemText>Solid</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
)

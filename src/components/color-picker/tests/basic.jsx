import { ColorPicker } from '../index.js'

export const ComponentUnderTest = (props) => (
  <ColorPicker.Root defaultValue="#0f766e" {...props}>
    <ColorPicker.Label>Color</ColorPicker.Label>
    <ColorPicker.Input />
    <ColorPicker.Swatch />
  </ColorPicker.Root>
)

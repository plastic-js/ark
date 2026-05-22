import { DatePicker } from '../index.js'

export const ComponentUnderTest = (props) => (
  <DatePicker.Root {...props}>
    <DatePicker.Input />
    <DatePicker.Trigger>Pick date</DatePicker.Trigger>
    <DatePicker.Content>
      <DatePicker.CloseTrigger>Close</DatePicker.CloseTrigger>
    </DatePicker.Content>
  </DatePicker.Root>
)

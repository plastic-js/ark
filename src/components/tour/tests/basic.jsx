import { Tour } from '../index.js'

const defaultSteps = [
  { id: 'first', type: 'dialog', title: 'First', description: 'Intro' },
]

export const ComponentUnderTest = ({ steps = defaultSteps, ...props }) => (
  <Tour.Root steps={steps} {...props}>
    <Tour.Trigger>Start</Tour.Trigger>
    <Tour.Backdrop />
    <Tour.Positioner>
      <Tour.Content>
        <Tour.Title />
        <Tour.Description />
        <Tour.CloseTrigger>Close</Tour.CloseTrigger>
      </Tour.Content>
    </Tour.Positioner>
  </Tour.Root>
)

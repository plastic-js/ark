import { Dialog } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Dialog.Root {...props}>
    <Dialog.Trigger>Open dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog title</Dialog.Title>
        <Dialog.Description>Dialog body</Dialog.Description>
        <button id="inside-dialog">Action</button>
        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)

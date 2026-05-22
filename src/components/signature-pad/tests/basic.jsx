import { SignaturePad } from '../index.js'

export const ComponentUnderTest = (props) => (
  <SignaturePad.Root {...props}>
    <SignaturePad.Label>Signature</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.Guide />
      <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
    </SignaturePad.Control>
    <SignaturePad.HiddenInput value="" />
  </SignaturePad.Root>
)

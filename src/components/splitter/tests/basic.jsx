import { Splitter } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Splitter.Root defaultValue={40} {...props}>
    <Splitter.Panel>Start</Splitter.Panel>
    <Splitter.ResizeTrigger tabIndex={0} />
    <Splitter.Panel>End</Splitter.Panel>
  </Splitter.Root>
)

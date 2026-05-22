import { DateInput, useDateInputContext } from '../index.js'

const DateInputSegments = () => {
  const dateInput = useDateInputContext()
  return () => dateInput().getSegments().map((segment, index) =>
    <DateInput.Segment segment={segment} key={index} />,
  )
}

const DateInputField = () => (
  <DateInput.HiddenInput>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInputSegments />
      </DateInput.SegmentGroup>
    </DateInput.Control>
  </DateInput.HiddenInput>
)

export const ComponentUnderTest = (props) => (
  <DateInput.Root defaultValue="2026-05-02" {...props}>
    <DateInput.Label>Date</DateInput.Label>
    <DateInputField />
  </DateInput.Root>
)

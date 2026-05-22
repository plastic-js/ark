import { Progress } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Progress.Root max={100} value={50} {...props}>
    <Progress.Label>Upload</Progress.Label>
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
    <Progress.ValueText />
    <Progress.View state="loading">Loading…</Progress.View>
    <Progress.View state="complete">Complete</Progress.View>
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)

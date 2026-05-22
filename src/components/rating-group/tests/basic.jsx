import { RatingGroup } from '../index.js'

export const ComponentUnderTest = (props) => (
  <RatingGroup.Root defaultValue={2} count={3} name="rating" {...props}>
    <RatingGroup.Label>Rating</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Item value={1}>
        <RatingGroup.ItemText>1</RatingGroup.ItemText>
      </RatingGroup.Item>
      <RatingGroup.Item value={2}>
        <RatingGroup.ItemText>2</RatingGroup.ItemText>
      </RatingGroup.Item>
      <RatingGroup.Item value={3}>
        <RatingGroup.ItemText>3</RatingGroup.ItemText>
      </RatingGroup.Item>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
)

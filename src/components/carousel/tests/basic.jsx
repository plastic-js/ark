import { Carousel } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Carousel.Root slideCount={3} {...props}>
    <Carousel.PrevTrigger>Prev</Carousel.PrevTrigger>
    <Carousel.ItemGroup>
      <Carousel.Item index={0}>One</Carousel.Item>
      <Carousel.Item index={1}>Two</Carousel.Item>
      <Carousel.Item index={2}>Three</Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.NextTrigger>Next</Carousel.NextTrigger>
  </Carousel.Root>
)

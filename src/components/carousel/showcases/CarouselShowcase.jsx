import { createSignal } from '../../../runtime.js'
import { css } from '@emotion/css'
import { Carousel } from '../../../index.js'

const itemColors = [
	'#fde8e8',
	'#fef3e2',
	'#fefde2',
	'#e2f5e2',
	'#e2f0fe',
	'#ede2fe',
]

const itemWidths = ['240px', '360px', '180px', '300px', '260px', '320px']

const carouselItemClass = (index) => css({
	padding: '14px',
	background: itemColors[index % itemColors.length],
	border: '1px solid rgba(29, 41, 53, 0.08)',
	borderRadius: '16px',
})

const carouselItemStyle = (index) => ({
	flex: `0 0 ${itemWidths[index % itemWidths.length]}`,
})

const CarouselShowcase = ()=> {
	const page = createSignal(0)
	const slides = ['Overview', 'Components', 'Ship it', 'Apple', 'Peras', 'Bananas']

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Carousel</h1>
				<p className='hero-copy'>Live, component-specific demo for Carousel.</p>
			</header>
			<section className='feature-card'>
				<Carousel.Root page={page} loop autoSize onPageChange={({ page: nextPage })=> page(nextPage)} slideCount={slides.length} spacing='16px'>
					<div className='button-row'>
						<Carousel.PrevTrigger>Prev</Carousel.PrevTrigger>
						<Carousel.NextTrigger>Next</Carousel.NextTrigger>
					</div>
					<Carousel.ItemGroup>
						{slides.map((slide, position)=> (
							<Carousel.Item className={carouselItemClass(position)} index={position} key={slide} style={carouselItemStyle(position)}>
								<strong>
									{slide}
								</strong>
								<p>
									Slide
									{position + 1}
								</p>
							</Carousel.Item>
						))}
					</Carousel.ItemGroup>
				</Carousel.Root>
				<code className='anatomy'>{`<Carousel.Root>
  <Carousel.Control>
    <Carousel.PrevTrigger />
    <Carousel.NextTrigger />
    <Carousel.AutoplayTrigger />
  </Carousel.Control>
  <Carousel.ItemGroup>
    <Carousel.Item />
  </Carousel.ItemGroup>
  <Carousel.IndicatorGroup>
    <Carousel.Indicator />
  </Carousel.IndicatorGroup>
  <Carousel.ProgressText />
</Carousel.Root>`}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default CarouselShowcase

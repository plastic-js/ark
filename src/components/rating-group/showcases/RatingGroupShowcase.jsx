import { createSignal } from '../../../runtime.js'
import { RatingGroup } from '../../../index.js'

const StarIcon = ()=> (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		style={{
			width: '2rem',
			height: '2rem',
			display: 'block',
		}}
	>
		<path fill='currentColor' d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
	</svg>
)

const RatingGroupShowcase = ()=> {
	const value = createSignal(2)

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>RatingGroup</h1>
				<p className='hero-copy'>Live, component-specific demo for RatingGroup.</p>
			</header>
			<section className='feature-card'>
				<RatingGroup.Root count={5} onValueChange={value} value={value}>
					<RatingGroup.Label>Rate this demo</RatingGroup.Label>
					<div
						className='button-row'
						style={{ display: 'flex', gap: '0.25rem' }}
					>
						{Array.from({ length: 5 }, (_, index)=> (
							<RatingGroup.Item
								index={index + 1}
								key={index + 1}
								style={{
									background: 'none',
									border: 'none',
									padding: '0',
									cursor: 'pointer',
								}}
							>
								<RatingGroup.ItemText>
									<StarIcon />
								</RatingGroup.ItemText>
							</RatingGroup.Item>
						))}
					</div>
					<RatingGroup.HiddenInput name='demo-rating' />
				</RatingGroup.Root>
				<style>{`
					[data-part="item-text"] {
						color: #3a3a3a;
						fill: currentColor;
					}
					[data-part="item-text"][data-highlighted],
					[data-part="item-text"][data-checked] {
						color: #c0392b;
					}
					[data-part="item"] {
						background: none;
						border: none;
						padding: 0;
						cursor: pointer;
					}
					[data-part="item"]:focus {
						outline: none;
					}
				`}</style>
				<code className='anatomy'>{`<RatingGroup.Root>
  <RatingGroup.Label />
  <RatingGroup.Control>
    <RatingGroup.Item>
      <RatingGroup.ItemText />
    </RatingGroup.Item>
  </RatingGroup.Control>
  <RatingGroup.HiddenInput />
</RatingGroup.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default RatingGroupShowcase

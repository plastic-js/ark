import { createSignal } from '../../../runtime.js'
import { TagsInput } from '../../../index.js'

const TagsInputShowcase = ()=> {
	const value = createSignal(['jsx', 'signals'])

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>TagsInput</h1>
				<p className='hero-copy'>Live, component-specific demo for TagsInput.</p>
			</header>
			<section className='feature-card'>
				<TagsInput.Root onValueChange={value} value={value}>
					<TagsInput.Label>Topics</TagsInput.Label>
					<TagsInput.Control>
						{()=> value().map((tag, index)=> (
							<TagsInput.Item key={tag} index={index} value={tag}>
								<TagsInput.ItemPreview>
									<TagsInput.ItemText>{tag}</TagsInput.ItemText>
									<TagsInput.ItemDeleteTrigger>×</TagsInput.ItemDeleteTrigger>
								</TagsInput.ItemPreview>
								<TagsInput.ItemInput />
							</TagsInput.Item>
						))}
						<TagsInput.Input placeholder='Add Framework' />
						<TagsInput.ClearTrigger>Clear topics</TagsInput.ClearTrigger>
					</TagsInput.Control>
					<TagsInput.HiddenInput />
				</TagsInput.Root>
				<code className='anatomy'>{`<TagsInput.Root>
  <TagsInput.Label />
  <TagsInput.Control>
    <TagsInput.Item>
      <TagsInput.ItemPreview>
        <TagsInput.ItemText />
        <TagsInput.ItemDeleteTrigger />
      </TagsInput.ItemPreview>
      <TagsInput.ItemInput />
    </TagsInput.Item>
    <TagsInput.Input />
    <TagsInput.ClearTrigger />
  </TagsInput.Control>
  <TagsInput.HiddenInput />
</TagsInput.Root>`}</code>
			</section>
		</div>
	)
}

export default TagsInputShowcase

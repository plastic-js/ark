import { css } from '@emotion/css'
import { createComputed, createSignal } from '../../../runtime.js'
import { Combobox } from '../../../index.js'
import { ListCollection } from '@zag-js/collection'

const allItems = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' },
	{ label: 'Grape', value: 'grape' },
	{ label: 'Mango', value: 'mango' },
]

const collection = new ListCollection({ items: allItems })

const demoStageClass = css({
	display: 'flex',
	justifyContent: 'center',
	padding: '32px 24px',
	borderRadius: '18px',
	background: 'rgba(255, 255, 255, 0.55)',
	border: '1px dashed rgba(29, 41, 53, 0.14)',
})

const rootClass = css({
	width: '320px',
	display: 'grid',
	gap: '10px',
	fontFamily: 'inherit',
	color: '#1d2935',
})

const labelClass = css({
	fontSize: '14px',
	fontWeight: 600,
	color: '#1d2935',
})

const comboboxControlClass = css({
	display: 'flex',
	alignItems: 'center',
	borderRadius: '10px',
	border: '1px solid rgba(29, 41, 53, 0.18)',
	background: '#ffffff',
	overflow: 'hidden',
	'&:focus-within': {
		borderColor: '#3884ff',
		boxShadow: '0 0 0 3px rgba(56, 132, 255, 0.15)',
	},
})

const inputClass = css({
	flex: 1,
	padding: '10px 14px',
	border: 'none',
	outline: 'none',
	fontSize: '14px',
	color: '#1d2935',
	background: 'transparent',
	'&::placeholder': {
		color: '#8a96a3',
	},
})

const triggerClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '0 12px',
	height: '100%',
	border: 'none',
	borderLeft: '1px solid rgba(29, 41, 53, 0.10)',
	background: 'transparent',
	color: '#586573',
	cursor: 'pointer',
	fontSize: '16px',
	transition: 'background 120ms ease',
	'&:hover': {
		background: 'rgba(29, 41, 53, 0.04)',
	},
})

const contentClass = css({
	display: 'grid',
	gap: '4px',
	padding: '8px',
	borderRadius: '14px',
	background: '#ffffff',
	border: '1px solid rgba(29, 41, 53, 0.08)',
	boxShadow: '0 18px 40px rgba(29, 41, 53, 0.12)',
	'&[hidden]': { display: 'none' },
})

const groupClass = css({
	display: 'grid',
	gap: '2px',
})

const groupLabelClass = css({
	padding: '6px 10px 4px',
	fontSize: '11px',
	fontWeight: 600,
	letterSpacing: '0.06em',
	textTransform: 'uppercase',
	color: '#8a96a3',
})

const itemClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '12px',
	padding: '10px 12px',
	borderRadius: '10px',
	fontSize: '14px',
	cursor: 'pointer',
	transition: 'background 120ms ease, color 120ms ease',
	'&:hover, &[data-highlighted]': {
		background: 'rgba(29, 41, 53, 0.06)',
	},
	'&[data-state="checked"]': {
		background: 'rgba(56, 132, 255, 0.12)',
		color: '#1c4ed8',
	},
})

const itemTextClass = css({
	fontWeight: 500,
})

const itemIndicatorClass = css({
	fontSize: '11px',
	fontWeight: 600,
	letterSpacing: '0.06em',
	textTransform: 'uppercase',
	color: '#1c4ed8',
	'&[hidden]': {
		display: 'none',
	},
})

const emptyClass = css({
	padding: '20px 12px',
	textAlign: 'center',
	fontSize: '14px',
	color: '#8a96a3',
})

const emptyCollection = new ListCollection({ items: [] })

const ComboboxShowcase = ()=> {
	const inputValue = createSignal('')
	const filteredCollection = createComputed(()=> {
		const query = inputValue().toLowerCase()
		return new ListCollection({
			items: query ? allItems.filter(i=> i.label.toLowerCase().includes(query)) : allItems,
		})
	})

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Combobox</h1>
				<p className='hero-copy'>Live, component-specific demo for Combobox.</p>
			</header>
			<section className='feature-card'>
				<div className={demoStageClass}>
					<Combobox.Root
						className={rootClass}
						collection={filteredCollection}
						defaultValue={['apple']}
						closeOnSelect
						onInputValueChange={inputValue}
						onOpenChange={(open)=> { if (open) inputValue('') }}
					>
						<Combobox.Label className={labelClass}>Favorite Fruit</Combobox.Label>
						<Combobox.Control className={comboboxControlClass}>
							<Combobox.Input className={inputClass} placeholder='Type to filter…' />
							<Combobox.Trigger className={triggerClass}>⌃</Combobox.Trigger>
						</Combobox.Control>
						<Combobox.Content className={contentClass}>
							<Combobox.Empty className={emptyClass}>No matching fruits</Combobox.Empty>
							<Combobox.ItemGroup className={groupClass}>
								<Combobox.ItemGroupLabel className={groupLabelClass}>Fruits</Combobox.ItemGroupLabel>
								{()=> filteredCollection().items.map(item=> (
									<Combobox.Item className={itemClass} item={item}>
										<Combobox.ItemText className={itemTextClass}>{item.label}</Combobox.ItemText>
										<Combobox.ItemIndicator className={itemIndicatorClass}>Selected</Combobox.ItemIndicator>
									</Combobox.Item>
								))}
							</Combobox.ItemGroup>
						</Combobox.Content>
					</Combobox.Root>
				</div>
				<div className={demoStageClass}>
					<Combobox.Root
						className={rootClass}
						collection={emptyCollection}
						defaultOpen
					>
						<Combobox.Label className={labelClass}>Empty State</Combobox.Label>
						<Combobox.Control className={comboboxControlClass}>
							<Combobox.Input className={inputClass} placeholder='No results…' />
							<Combobox.Trigger className={triggerClass}>⌃</Combobox.Trigger>
						</Combobox.Control>
						<Combobox.Content className={contentClass}>
							<Combobox.Empty className={emptyClass}>No matching fruits</Combobox.Empty>
							<Combobox.ItemGroup className={groupClass}>
								<Combobox.ItemGroupLabel className={groupLabelClass}>Fruits</Combobox.ItemGroupLabel>
							</Combobox.ItemGroup>
						</Combobox.Content>
					</Combobox.Root>
				</div>
				<code className='anatomy'>{`<Combobox.Root>
  <Combobox.Label />
  <Combobox.Control>
    <Combobox.Input />
    <Combobox.Trigger />
    <Combobox.ClearTrigger />
  </Combobox.Control>
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.ItemGroup>
      <Combobox.ItemGroupLabel />
      <Combobox.Item>
        <Combobox.ItemText />
        <Combobox.ItemIndicator />
      </Combobox.Item>
    </Combobox.ItemGroup>
  </Combobox.Content>
</Combobox.Root>`}</code>
			</section>
		</div>
	)
}

export default ComboboxShowcase

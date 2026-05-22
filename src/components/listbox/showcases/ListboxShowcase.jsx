import { css } from '@emotion/css'
import { createComputed, createSignal } from '../../../runtime.js'
import { Listbox } from '../../../index.js'

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
	fontSize: '12px',
	fontWeight: 600,
	letterSpacing: '0.08em',
	textTransform: 'uppercase',
	color: '#586573',
})

const contentClass = css({
	display: 'grid',
	gap: '4px',
	padding: '8px',
	borderRadius: '14px',
	background: '#ffffff',
	border: '1px solid rgba(29, 41, 53, 0.08)',
	boxShadow: '0 18px 40px rgba(29, 41, 53, 0.12)',
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

const emptyClass = css({
	padding: '20px 12px',
	textAlign: 'center',
	fontSize: '14px',
	color: '#8a96a3',
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

const selectionClass = css({
	padding: '10px 12px',
	borderRadius: '10px',
	background: 'rgba(29, 41, 53, 0.04)',
	fontSize: '13px',
	color: '#1d2935',
	'& strong': {
		fontWeight: 600,
		color: '#1c4ed8',
	},
})

const frameworkLabelMap = {
	solid: 'Solid',
	plastic: 'Plastic',
}

const fruitLabelMap = {
	apple: 'Apple',
	mango: 'Mango',
	lychee: 'Lychee',
}

const ListboxShowcase = ()=> {
	const multiValue = createSignal(['solid'])
	const multiSelectionText = createComputed(()=> {
		const current = multiValue()
		if (!current || current.length === 0){
			return 'None'
		}
		return current.map(key=> frameworkLabelMap[key] ?? key).join(', ')
	})

	const singleValue = createSignal(['apple'])
	const singleSelectionText = createComputed(()=> {
		const current = singleValue()
		if (!current || current.length === 0){
			return 'None'
		}
		// NOTE: single-select Listbox 的 value 可能是 string 或 array，必須先用 Array.isArray 判斷，
		// 否則對 string 做 current[0] 會拿到首字元（例如 'mango' → 'm'）。
		const key = Array.isArray(current) ? current[0] : current
		return fruitLabelMap[key] ?? key
	})

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Listbox</h1>
				<p className='hero-copy'>Live, component-specific demo for Listbox.</p>
			</header>
			<section className='feature-card'>
				<div className={demoStageClass}>
					<Listbox.Root className={rootClass} multiple onValueChange={multiValue} value={multiValue}>
						<Listbox.Label className={labelClass}>Framework shortlist</Listbox.Label>
						<Listbox.Content className={contentClass}>
							<Listbox.ItemGroup className={groupClass}>
								<Listbox.ItemGroupLabel className={groupLabelClass}>Candidates</Listbox.ItemGroupLabel>
								<Listbox.Item className={itemClass} value='solid'>
									<Listbox.ItemText className={itemTextClass}>Solid</Listbox.ItemText>
									<Listbox.ItemIndicator className={itemIndicatorClass}>Selected</Listbox.ItemIndicator>
																	</Listbox.Item>
								<Listbox.Item className={itemClass} value='plastic'>
									<Listbox.ItemText className={itemTextClass}>Plastic</Listbox.ItemText>
									<Listbox.ItemIndicator className={itemIndicatorClass}>Selected</Listbox.ItemIndicator>
																	</Listbox.Item>
							</Listbox.ItemGroup>
						</Listbox.Content>
						<p className={selectionClass}>
							{'Selected: '}
							<strong>
								{multiSelectionText}
							</strong>
						</p>
					</Listbox.Root>
				</div>
			</section>
			<section className='feature-card'>
				<div className={demoStageClass}>
					<Listbox.Root className={rootClass} onValueChange={singleValue} value={singleValue}>
						<Listbox.Label className={labelClass}>Favourite fruit</Listbox.Label>
						<Listbox.Content className={contentClass}>
							<Listbox.ItemGroup className={groupClass}>
								<Listbox.ItemGroupLabel className={groupLabelClass}>Options</Listbox.ItemGroupLabel>
								<Listbox.Item className={itemClass} value='apple'>
									<Listbox.ItemText className={itemTextClass}>Apple</Listbox.ItemText>
									<Listbox.ItemIndicator className={itemIndicatorClass}>Selected</Listbox.ItemIndicator>
																	</Listbox.Item>
								<Listbox.Item className={itemClass} value='mango'>
									<Listbox.ItemText className={itemTextClass}>Mango</Listbox.ItemText>
									<Listbox.ItemIndicator className={itemIndicatorClass}>Selected</Listbox.ItemIndicator>
																	</Listbox.Item>
								<Listbox.Item className={itemClass} value='lychee'>
									<Listbox.ItemText className={itemTextClass}>Lychee</Listbox.ItemText>
									<Listbox.ItemIndicator className={itemIndicatorClass}>Selected</Listbox.ItemIndicator>
																	</Listbox.Item>
							</Listbox.ItemGroup>
						</Listbox.Content>
						<p className={selectionClass}>
							{'Selected: '}
							<strong>
								{singleSelectionText}
							</strong>
						</p>
					</Listbox.Root>
				</div>
			</section>
			<section className='feature-card'>
				<div className={demoStageClass}>
					<Listbox.Root className={rootClass}>
						<Listbox.Label className={labelClass}>Empty state</Listbox.Label>
						<Listbox.Content className={contentClass}>
							<Listbox.Empty className={emptyClass}>No items available</Listbox.Empty>
						</Listbox.Content>
					</Listbox.Root>
				</div>
			</section>
				<code className='anatomy'>{`<Listbox.Root>
  <Listbox.Label />
  <Listbox.ValueText />
  <Listbox.Input />
  <Listbox.Content>
    <Listbox.Empty />
    <Listbox.ItemGroup>
      <Listbox.ItemGroupLabel />
      <Listbox.Item>
        <Listbox.ItemText />
        <Listbox.ItemIndicator />
      </Listbox.Item>
    </Listbox.ItemGroup>
  </Listbox.Content>
</Listbox.Root>`}</code>
		</div>
	)
}

export default ListboxShowcase

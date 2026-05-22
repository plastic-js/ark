import { css } from '@emotion/css'
import { ListCollection } from '@zag-js/collection'
import { createSignal } from '../../../runtime.js'
import { Select } from '../../../index.js'

const styles = {
	label: css`
		font-size: 13px;
		font-weight: 700;
		color: var(--muted);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	`,
	buttonRow: css`
		display: flex;
		gap: 10px;
		align-items: center;
	`,
	trigger: css`
		display: inline-flex;
		align-items: center;
		gap: 10px;
		min-width: 200px;
		justify-content: space-between;
		background: rgba(255, 255, 255, 0.85);
		border: 1.5px solid var(--panel-border);
		border-radius: 12px;
		padding: 10px 16px;
		font-size: 15px;
		font-weight: 600;
		color: var(--ink);
		cursor: pointer;
		transition: border-color 180ms ease, box-shadow 180ms ease;

		&:hover {
			border-color: var(--accent);
			box-shadow: 0 4px 16px rgba(15, 118, 110, 0.14);
		}
	`,
	triggerInner: css`
		display: flex;
		align-items: center;
		gap: 8px;
	`,
	triggerPrefix: css`
		font-size: 13px;
		color: var(--muted);
		font-weight: 500;
	`,
	triggerArrow: css`
		font-size: 11px;
		color: var(--muted);
		line-height: 1;
	`,
	clearTrigger: css`
		min-width: auto;
		padding: 10px 16px;
		border-radius: 12px;
		font-size: 13px;
	`,
	content: css`
		background: rgba(255, 252, 247, 0.97);
		backdrop-filter: blur(12px);
		border: 1px solid var(--panel-border);
		border-radius: 16px;
		box-shadow: 0 12px 36px rgba(29, 41, 53, 0.14);
		padding: 8px;
		margin-top: 6px;
	`,
	groupLabel: css`
		padding: 6px 10px;
		font-size: 11px;
		font-weight: 700;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	`,
	item: css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 12px;
		border-radius: 10px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;

		&:hover {
			background: rgba(15, 118, 110, 0.07);
		}
	`,
	itemIndicator: css`
		font-size: 12px;
		color: var(--accent);
		font-weight: 700;
	`,
}

const SelectShowcase = ()=> {
	const value = createSignal('solid')
	const collection = new ListCollection({
		items: [
			{ label: 'Solid', value: 'solid' },
			{ label: 'Plastic', value: 'plastic' },
		],
	})

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Select</h1>
				<p className='hero-copy'>Live, component-specific demo for Select.</p>
			</header>
			<section className='feature-card'>
				<Select.Root collection={collection} onValueChange={([v])=> value(v)} value={value}>
					<Select.Label className={styles.label}>
						Primary runtime
					</Select.Label>
					<Select.Control className={`button-row ${styles.buttonRow}`}>
						<Select.Trigger className={styles.trigger}>
							<span className={styles.triggerInner}>
								<span className={styles.triggerPrefix}>Runtime:</span>
								<Select.ValueText placeholder='Choose one…' />
							</span>
							<span className={styles.triggerArrow}>▾</span>
						</Select.Trigger>
						<Select.ClearTrigger className={styles.clearTrigger}>
							Clear
						</Select.ClearTrigger>
					</Select.Control>
					<Select.Content className={styles.content}>
						<Select.ItemGroup>
							<Select.ItemGroupLabel className={styles.groupLabel}>
								Headless
							</Select.ItemGroupLabel>
							<Select.Item className={styles.item} item={collection.find('solid')}>
								<Select.ItemText>Solid</Select.ItemText>
								<Select.ItemIndicator className={styles.itemIndicator}>✓</Select.ItemIndicator>
							</Select.Item>
							<Select.Item className={styles.item} item={collection.find('plastic')}>
								<Select.ItemText>Plastic</Select.ItemText>
								<Select.ItemIndicator className={styles.itemIndicator}>✓</Select.ItemIndicator>
							</Select.Item>
						</Select.ItemGroup>
					</Select.Content>
				</Select.Root>
				<code className='anatomy'>{`<Select.Root>
  <Select.Label />
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText />
      <Select.Indicator />
    </Select.Trigger>
    <Select.ClearTrigger />
  </Select.Control>
  <Select.HiddenSelect />
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        <Select.ItemGroup>
          <Select.ItemGroupLabel />
          <Select.Item>
            <Select.ItemText />
            <Select.ItemIndicator />
          </Select.Item>
        </Select.ItemGroup>
      </Select.List>
    </Select.Content>
  </Select.Positioner>
</Select.Root>`}</code>
				<div className='checklist' />
			</section>
		</div>
	)
}

export default SelectShowcase

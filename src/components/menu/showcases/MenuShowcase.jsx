import { css } from '@emotion/css'
import { createSignal } from '../../../runtime.js'
import { Menu } from '../../../index.js'

const rootClass = css({
	position: 'relative',
	display: 'inline-block',
})

const contentClass = css({
	background: '#ffffff',
	border: '1px solid rgba(29, 41, 53, 0.12)',
	borderRadius: '8px',
	padding: '4px',
	minWidth: '160px',
	boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
	'&[hidden]': {
		display: 'none',
	},
})

const itemClass = css({
	display: 'flex',
	alignItems: 'center',
	padding: '8px 12px',
	borderRadius: '6px',
	cursor: 'pointer',
	fontSize: '14px',
	color: '#1d2935',
	outline: 'none',
	'&:hover, &[data-highlighted]': {
		background: 'rgba(29, 41, 53, 0.06)',
	},
})

const groupLabelClass = css({
	padding: '6px 12px 2px',
	fontSize: '11px',
	fontWeight: 600,
	color: '#586573',
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
})

const MenuShowcase = ()=> {
	const action = createSignal('archive')

	return (
		<div className='container'>
			<header className='hero'>
				<p className='eyebrow'>ark-plastic component showcase</p>
				<h1>Menu</h1>
				<p className='hero-copy'>Live, component-specific demo for Menu.</p>
			</header>
			<section className='feature-card'>
				<Menu.Root onSelect={action} className={rootClass}>
					<Menu.Trigger>Quick actions</Menu.Trigger>
					<Menu.Positioner>
						<Menu.Content className={contentClass}>
							<Menu.ItemGroup>
								<Menu.ItemGroupLabel className={groupLabelClass}>Project</Menu.ItemGroupLabel>
								<Menu.Item value='archive' className={itemClass}><Menu.ItemText>Archive</Menu.ItemText></Menu.Item>
								<Menu.Item value='duplicate' className={itemClass}><Menu.ItemText>Duplicate</Menu.ItemText></Menu.Item>
							</Menu.ItemGroup>
						</Menu.Content>
					</Menu.Positioner>
				</Menu.Root>
				<code className='anatomy'>{`<Menu.Root>
  <Menu.Trigger />
  <Menu.Indicator />
  <Menu.Positioner>
    <Menu.Arrow>
      <Menu.ArrowTip />
    </Menu.Arrow>
    <Menu.Content>
      <Menu.Separator />
      <Menu.ItemGroup>
        <Menu.ItemGroupLabel />
        <Menu.Item>
          <Menu.ItemText />
          <Menu.ItemIndicator />
        </Menu.Item>
        <Menu.CheckboxItem>
          <Menu.ItemIndicator />
        </Menu.CheckboxItem>
        <Menu.RadioItemGroup>
          <Menu.RadioItem>
            <Menu.ItemIndicator />
          </Menu.RadioItem>
        </Menu.RadioItemGroup>
        <Menu.TriggerItem />
      </Menu.ItemGroup>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>`}</code>
				<div className='checklist'>
				</div>
			</section>
		</div>
	)
}

export default MenuShowcase

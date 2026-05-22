import { MenuArrow } from './menu-arrow.jsx'
import { MenuArrowTip } from './menu-arrow-tip.jsx'
import { MenuCheckboxItem } from './menu-checkbox-item.jsx'
import { MenuContent } from './menu-content.jsx'
import { MenuIndicator } from './menu-indicator.jsx'
import { MenuItem } from './menu-item.jsx'
import { MenuItemGroup } from './menu-item-group.jsx'
import { MenuItemGroupLabel } from './menu-item-group-label.jsx'
import { MenuItemIndicator } from './menu-item-indicator.jsx'
import { MenuItemText } from './menu-item-text.jsx'
import { MenuPositioner } from './menu-positioner.jsx'
import { MenuRadioItem } from './menu-radio-item.jsx'
import { MenuRadioItemGroup } from './menu-radio-item-group.jsx'
import { MenuRoot } from './menu-root.jsx'
import { MenuSeparator } from './menu-separator.jsx'
import { MenuTrigger } from './menu-trigger.jsx'
import { MenuTriggerItem } from './menu-trigger-item.jsx'

const menuParts = {
	Root: MenuRoot,
	Trigger: MenuTrigger,
	TriggerItem: MenuTriggerItem,
	Positioner: MenuPositioner,
	Content: MenuContent,
	Item: MenuItem,
	ItemText: MenuItemText,
	ItemIndicator: MenuItemIndicator,
	ItemGroup: MenuItemGroup,
	ItemGroupLabel: MenuItemGroupLabel,
	CheckboxItem: MenuCheckboxItem,
	RadioItem: MenuRadioItem,
	RadioItemGroup: MenuRadioItemGroup,
	Indicator: MenuIndicator,
	Arrow: MenuArrow,
	ArrowTip: MenuArrowTip,
	Separator: MenuSeparator,
}

export const Menu = Object.assign(MenuRoot, menuParts)
export {
	MenuRoot as Root,
	MenuTrigger as Trigger,
	MenuTriggerItem as TriggerItem,
	MenuPositioner as Positioner,
	MenuContent as Content,
	MenuItem as Item,
	MenuItemText as ItemText,
	MenuItemIndicator as ItemIndicator,
	MenuItemGroup as ItemGroup,
	MenuItemGroupLabel as ItemGroupLabel,
	MenuCheckboxItem as CheckboxItem,
	MenuRadioItem as RadioItem,
	MenuRadioItemGroup as RadioItemGroup,
	MenuIndicator as Indicator,
	MenuArrow as Arrow,
	MenuArrowTip as ArrowTip,
	MenuSeparator as Separator,
}

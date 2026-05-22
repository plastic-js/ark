import { SelectClearTrigger } from './select-clear-trigger.jsx'
import { SelectContent } from './select-content.jsx'
import { SelectControl } from './select-control.jsx'
import { SelectHiddenSelect } from './select-hidden-select.jsx'
import { SelectIndicator } from './select-indicator.jsx'
import { SelectItem } from './select-item.jsx'
import { SelectItemGroup } from './select-item-group.jsx'
import { SelectItemGroupLabel } from './select-item-group-label.jsx'
import { SelectItemIndicator } from './select-item-indicator.jsx'
import { SelectItemText } from './select-item-text.jsx'
import { SelectLabel } from './select-label.jsx'
import { SelectList } from './select-list.jsx'
import { SelectPositioner } from './select-positioner.jsx'
import { SelectRoot } from './select-root.jsx'
import { SelectTrigger } from './select-trigger.jsx'
import { SelectValueText } from './select-value-text.jsx'

const selectParts = {
	Root: SelectRoot,
	Label: SelectLabel,
	Control: SelectControl,
	Trigger: SelectTrigger,
	Indicator: SelectIndicator,
	ValueText: SelectValueText,
	Positioner: SelectPositioner,
	Content: SelectContent,
	List: SelectList,
	Item: SelectItem,
	ItemText: SelectItemText,
	ItemIndicator: SelectItemIndicator,
	ItemGroup: SelectItemGroup,
	ItemGroupLabel: SelectItemGroupLabel,
	ClearTrigger: SelectClearTrigger,
	HiddenSelect: SelectHiddenSelect,
}

export const Select = Object.assign(SelectRoot, selectParts)
export {
	SelectRoot as Root,
	SelectLabel as Label,
	SelectControl as Control,
	SelectTrigger as Trigger,
	SelectIndicator as Indicator,
	SelectValueText as ValueText,
	SelectPositioner as Positioner,
	SelectContent as Content,
	SelectList as List,
	SelectItem as Item,
	SelectItemText as ItemText,
	SelectItemIndicator as ItemIndicator,
	SelectItemGroup as ItemGroup,
	SelectItemGroupLabel as ItemGroupLabel,
	SelectClearTrigger as ClearTrigger,
	SelectHiddenSelect as HiddenSelect,
}

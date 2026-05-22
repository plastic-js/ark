import { ComboboxRoot } from './combobox-root.jsx'
import { ComboboxLabel } from './combobox-label.jsx'
import { ComboboxControl } from './combobox-control.jsx'
import { ComboboxInput } from './combobox-input.jsx'
import { ComboboxTrigger } from './combobox-trigger.jsx'
import { ComboboxContent } from './combobox-content.jsx'
import { ComboboxItem } from './combobox-item.jsx'
import { ComboboxItemText } from './combobox-item-text.jsx'
import { ComboboxItemIndicator } from './combobox-item-indicator.jsx'
import { ComboboxItemGroup } from './combobox-item-group.jsx'
import { ComboboxItemGroupLabel } from './combobox-item-group-label.jsx'
import { ComboboxClearTrigger } from './combobox-clear-trigger.jsx'
import { ComboboxEmpty } from './combobox-empty.jsx'

const comboboxParts = {
	Root: ComboboxRoot,
	Label: ComboboxLabel,
	Control: ComboboxControl,
	Input: ComboboxInput,
	Trigger: ComboboxTrigger,
	Content: ComboboxContent,
	Item: ComboboxItem,
	ItemText: ComboboxItemText,
	ItemIndicator: ComboboxItemIndicator,
	ItemGroup: ComboboxItemGroup,
	ItemGroupLabel: ComboboxItemGroupLabel,
	ClearTrigger: ComboboxClearTrigger,
	Empty: ComboboxEmpty,
}

export const Combobox = Object.assign(ComboboxRoot, comboboxParts)
export {
	ComboboxRoot as Root,
	ComboboxLabel as Label,
	ComboboxControl as Control,
	ComboboxInput as Input,
	ComboboxTrigger as Trigger,
	ComboboxContent as Content,
	ComboboxItem as Item,
	ComboboxItemText as ItemText,
	ComboboxItemIndicator as ItemIndicator,
	ComboboxItemGroup as ItemGroup,
	ComboboxItemGroupLabel as ItemGroupLabel,
	ComboboxClearTrigger as ClearTrigger,
	ComboboxEmpty as Empty,
}

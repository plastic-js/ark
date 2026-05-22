import { ListboxContent } from './listbox-content.jsx'
import { ListboxEmpty } from './listbox-empty.jsx'
import { ListboxInput } from './listbox-input.jsx'
import { ListboxItem } from './listbox-item.jsx'
import { ListboxItemGroup } from './listbox-item-group.jsx'
import { ListboxItemGroupLabel } from './listbox-item-group-label.jsx'
import { ListboxItemIndicator } from './listbox-item-indicator.jsx'
import { ListboxItemText } from './listbox-item-text.jsx'
import { ListboxLabel } from './listbox-label.jsx'
import { ListboxRoot } from './listbox-root.jsx'
import { ListboxItemHiddenInput } from './listbox-item-hidden-input.jsx'
import { ListboxValueText } from './listbox-value-text.jsx'

const listboxParts = {
	Root: ListboxRoot,
	Label: ListboxLabel,
	Input: ListboxInput,
	ValueText: ListboxValueText,
	Content: ListboxContent,
	Item: ListboxItem,
	ItemText: ListboxItemText,
	ItemIndicator: ListboxItemIndicator,
	ItemHiddenInput: ListboxItemHiddenInput,
	ItemGroup: ListboxItemGroup,
	ItemGroupLabel: ListboxItemGroupLabel,
	Empty: ListboxEmpty,
}

export const Listbox = Object.assign(ListboxRoot, listboxParts)
export {
	ListboxRoot as Root,
	ListboxLabel as Label,
	ListboxInput as Input,
	ListboxValueText as ValueText,
	ListboxContent as Content,
	ListboxItem as Item,
	ListboxItemText as ItemText,
	ListboxItemIndicator as ItemIndicator,
	ListboxItemHiddenInput as ItemHiddenInput,
	ListboxItemGroup as ItemGroup,
	ListboxItemGroupLabel as ItemGroupLabel,
	ListboxEmpty as Empty,
}

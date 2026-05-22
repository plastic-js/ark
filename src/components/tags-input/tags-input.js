import { TagsInputRoot } from './tags-input-root.jsx'
import { TagsInputLabel } from './tags-input-label.jsx'
import { TagsInputControl } from './tags-input-control.jsx'
import { TagsInputInput } from './tags-input-input.jsx'
import { TagsInputItem } from './tags-input-item.jsx'
import { TagsInputItemText } from './tags-input-item-text.jsx'
import { TagsInputItemPreview } from './tags-input-item-preview.jsx'
import { TagsInputItemInput } from './tags-input-item-input.jsx'
import { TagsInputItemDeleteTrigger } from './tags-input-item-delete-trigger.jsx'
import { TagsInputClearTrigger } from './tags-input-clear-trigger.jsx'
import { TagsInputHiddenInput } from './tags-input-hidden-input.jsx'

const tagsInputParts = {
	Root: TagsInputRoot,
	Label: TagsInputLabel,
	Control: TagsInputControl,
	Input: TagsInputInput,
	Item: TagsInputItem,
	ItemPreview: TagsInputItemPreview,
	ItemInput: TagsInputItemInput,
	ItemText: TagsInputItemText,
	ItemDeleteTrigger: TagsInputItemDeleteTrigger,
	ClearTrigger: TagsInputClearTrigger,
	HiddenInput: TagsInputHiddenInput,
}

export const TagsInput = Object.assign(TagsInputRoot, tagsInputParts)
export {
	TagsInputRoot as Root,
	TagsInputLabel as Label,
	TagsInputControl as Control,
	TagsInputInput as Input,
	TagsInputItem as Item,
	TagsInputItemPreview as ItemPreview,
	TagsInputItemInput as ItemInput,
	TagsInputItemText as ItemText,
	TagsInputItemDeleteTrigger as ItemDeleteTrigger,
	TagsInputClearTrigger as ClearTrigger,
	TagsInputHiddenInput as HiddenInput,
}

import { RadioGroupIndicator } from './radio-group-indicator.jsx'
import { RadioGroupItemControl } from './radio-group-item-control.jsx'
import { RadioGroupItemHiddenInput } from './radio-group-item-hidden-input.jsx'
import { RadioGroupItemText } from './radio-group-item-text.jsx'
import { RadioGroupItem } from './radio-group-item.jsx'
import { RadioGroupLabel } from './radio-group-label.jsx'
import { RadioGroupRoot } from './radio-group-root.jsx'

const radioGroupParts = {
	Root: RadioGroupRoot,
	Label: RadioGroupLabel,
	Item: RadioGroupItem,
	ItemControl: RadioGroupItemControl,
	ItemText: RadioGroupItemText,
	ItemHiddenInput: RadioGroupItemHiddenInput,
	Indicator: RadioGroupIndicator,
}

export const RadioGroup = Object.assign(RadioGroupRoot, radioGroupParts)
export {
	RadioGroupIndicator as Indicator,
	RadioGroupItem as Item,
	RadioGroupItemControl as ItemControl,
	RadioGroupItemHiddenInput as ItemHiddenInput,
	RadioGroupItemText as ItemText,
	RadioGroupLabel as Label,
	RadioGroupRoot as Root,
}

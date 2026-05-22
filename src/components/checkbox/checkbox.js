import { CheckboxControl } from './checkbox-control.jsx'
import { CheckboxGroup } from './checkbox-group.jsx'
import { CheckboxHiddenInput } from './checkbox-hidden-input.jsx'
import { CheckboxIndicator } from './checkbox-indicator.jsx'
import { CheckboxLabel } from './checkbox-label.jsx'
import { CheckboxRoot } from './checkbox-root.jsx'

const checkboxParts = {
	Root: CheckboxRoot,
	Label: CheckboxLabel,
	Control: CheckboxControl,
	Indicator: CheckboxIndicator,
	HiddenInput: CheckboxHiddenInput,
	Group: CheckboxGroup,
}

export const Checkbox = Object.assign(CheckboxRoot, checkboxParts)
export {
	CheckboxControl as Control,
	CheckboxGroup as Group,
	CheckboxHiddenInput as HiddenInput,
	CheckboxIndicator as Indicator,
	CheckboxLabel as Label,
	CheckboxRoot as Root,
}

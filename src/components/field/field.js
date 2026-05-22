import { FieldErrorText } from './field-error-text.jsx'
import { FieldHelperText } from './field-helper-text.jsx'
import { FieldInput } from './field-input.jsx'
import { FieldItem } from './field-item.jsx'
import { FieldLabel } from './field-label.jsx'
import { FieldRequiredIndicator } from './field-required-indicator.jsx'
import { FieldRoot } from './field-root.jsx'
import { FieldSelect } from './field-select.jsx'
import { FieldTextarea } from './field-textarea.jsx'

const fieldParts = {
	Root: FieldRoot,
	Label: FieldLabel,
	Input: FieldInput,
	Textarea: FieldTextarea,
	Select: FieldSelect,
	HelperText: FieldHelperText,
	ErrorText: FieldErrorText,
	RequiredIndicator: FieldRequiredIndicator,
	Item: FieldItem,
}

export const Field = Object.assign(FieldRoot, fieldParts)
export {
	FieldErrorText as ErrorText,
	FieldHelperText as HelperText,
	FieldInput as Input,
	FieldItem as Item,
	FieldLabel as Label,
	FieldRequiredIndicator as RequiredIndicator,
	FieldRoot as Root,
	FieldSelect as Select,
	FieldTextarea as Textarea,
}

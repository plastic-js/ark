import { FieldsetErrorText } from './fieldset-error-text.jsx'
import { FieldsetHelperText } from './fieldset-helper-text.jsx'
import { FieldsetLegend } from './fieldset-legend.jsx'
import { FieldsetRoot } from './fieldset-root.jsx'

const fieldsetParts = {
	Root: FieldsetRoot,
	Legend: FieldsetLegend,
	HelperText: FieldsetHelperText,
	ErrorText: FieldsetErrorText,
}

export const Fieldset = Object.assign(FieldsetRoot, fieldsetParts)
export {
	FieldsetErrorText as ErrorText,
	FieldsetHelperText as HelperText,
	FieldsetLegend as Legend,
	FieldsetRoot as Root,
}

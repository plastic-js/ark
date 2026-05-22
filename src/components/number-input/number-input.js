import { NumberInputRoot } from './number-input-root.jsx'
import { NumberInputLabel } from './number-input-label.jsx'
import { NumberInputControl } from './number-input-control.jsx'
import { NumberInputInput } from './number-input-input.jsx'
import { NumberInputIncrementTrigger } from './number-input-increment-trigger.jsx'
import { NumberInputDecrementTrigger } from './number-input-decrement-trigger.jsx'
import { NumberInputValueText } from './number-input-value-text.jsx'

const numberInputParts = {
	Root: NumberInputRoot,
	Label: NumberInputLabel,
	Control: NumberInputControl,
	Input: NumberInputInput,
	IncrementTrigger: NumberInputIncrementTrigger,
	DecrementTrigger: NumberInputDecrementTrigger,
	ValueText: NumberInputValueText,
}

export const NumberInput = Object.assign(NumberInputRoot, numberInputParts)
export {
	NumberInputRoot as Root,
	NumberInputLabel as Label,
	NumberInputControl as Control,
	NumberInputInput as Input,
	NumberInputIncrementTrigger as IncrementTrigger,
	NumberInputDecrementTrigger as DecrementTrigger,
	NumberInputValueText as ValueText,
}

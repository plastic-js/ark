import * as numberInput from '@zag-js/number-input'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

const splitNumberInputProps = createSplitProps([
	...numberInput.props,
	'getValueText',
	'rootRef',
	'asChild',
	'children',
])

export const useNumberInput = (props = {})=> {
	const [machineProps, elementProps] = splitNumberInputProps(props)
	const id = createUniqueId('number-input')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const service = useMachine(numberInput.machine, ()=> ({
		id,
		dir: locale.dir,
		locale: locale.locale,
		getRootNode: environment.getRootNode,
		...machineProps,
		valueText: machineProps.getValueText ? value=> machineProps.getValueText(Number(value)) : machineProps.valueText,
		// Pass the string value, not valueAsNumber: deleting digits one by one with Backspace would otherwise surface NaN once the input is empty.
		onValueChange: details=> machineProps.onValueChange?.(details.value),
	}))
	const getValueText = ()=> {
		const api = numberInput.connect(service, normalizeProps)
		return machineProps.getValueText?.(api.valueAsNumber) ?? api.value
	}

	return createComputed(()=> {
		const api = numberInput.connect(service, normalizeProps)
		return {
			...api,
			getRootProps: ()=> mergeProps(api.getRootProps(), elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef),
				asChild: machineProps.asChild,
				'data-disabled': dataAttr(api.disabled),
				'data-invalid': dataAttr(api.invalid),
				children: machineProps.children,
			}),
			getInputProps: ()=> mergeProps(api.getInputProps(), {
				value: api.value,
				'aria-valuenow': Number.isNaN(api.valueAsNumber) ? undefined : api.valueAsNumber,
				'aria-valuetext': getValueText,
				onKeyDown: (event)=> {
					if (event.defaultPrevented){
						return
					}

					if (event.key === 'ArrowUp'){
						event.preventDefault()
						api.increment()
					}

					if (event.key === 'ArrowDown'){
						event.preventDefault()
						api.decrement()
					}

					if (event.key === 'Home'){
						event.preventDefault()
						api.setToMin()
					}

					if (event.key === 'End'){
						event.preventDefault()
						api.setToMax()
					}
				},
			}),
			getDecrementTriggerProps: ()=> mergeProps(api.getDecrementTriggerProps(), {
				onClick: ()=> {
					if (!api.getDecrementTriggerProps().disabled){
						api.decrement()
					}
				},
			}),
			getIncrementTriggerProps: ()=> mergeProps(api.getIncrementTriggerProps(), {
				onClick: ()=> {
					if (!api.getIncrementTriggerProps().disabled){
						api.increment()
					}
				},
			}),
			getValueTextProps: ()=> mergeProps(api.getValueTextProps(), {
				textContent: getValueText,
			}),
		}
	})
}

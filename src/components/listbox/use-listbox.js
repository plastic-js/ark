import * as listbox from '@zag-js/listbox'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { listboxAnatomy } from './listbox.anatomy.js'
import { createListboxCollection } from './listbox.utils.js'

const splitListboxProps = createSplitProps([
	...listbox.props,
	'multiple',
	'disabled',
	'name',
	'rootRef',
	'asChild',
	'children',
])

const normalizeValue = value=> (Array.isArray(value) ? value : value == null ? [] : [value])

export const useListbox = (props = {})=> {
	const [machineProps, elementProps] = splitListboxProps(props)
	const anatomy = listboxAnatomy.build()
	const id = machineProps.id ?? createUniqueId('listbox')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	const multiple = ()=> Boolean(machineProps.multiple)
	const getCollection = ()=> machineProps.collection ?? createListboxCollection(machineProps.children, id)
	const access = value=> (typeof value === 'function' ? value() : value)
	let rootNode = null
	const service = useMachine(listbox.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		collection: getCollection(),
		selectionMode: machineProps.selectionMode ?? (multiple() ? 'multiple' : 'single'),
		...machineProps.value !== undefined ? { value: normalizeValue(access(machineProps.value)) } : {},
		...machineProps.defaultValue !== undefined ? { defaultValue: normalizeValue(access(machineProps.defaultValue)) } : {},
		onValueChange: details=> machineProps.onValueChange?.(multiple() ? details.value : details.value[0] ?? null),
	}))

	return createComputed(()=> {
		const api = listbox.connect(service, normalizeProps)
		const collection = getCollection()
		const getContentElement = ()=> rootNode?.querySelector?.('[data-scope="listbox"][data-part="content"]') ?? null
		const getItemElement = value=> rootNode?.querySelector?.(`[data-scope="listbox"][data-part="item"][data-value="${value}"]`) ?? null
		const getEnabledValues = ()=> collection.getValues().filter(value=> !collection.getItemDisabled(collection.find(value)))
		const focusValue = (value)=> {
			const node = getItemElement(value)
			if (node && !node.hasAttribute('tabindex')){
				node.tabIndex = -1
			}
			api.highlightValue(value)
			node?.focus?.()
			return node
		}
		const focusBoundary = (boundary)=> {
			const values = getEnabledValues()
			const value = boundary === 'last' ? values[values.length - 1] : values[0]
			return value ? focusValue(value) : null
		}
		const moveFocus = (currentValue, offset)=> {
			const nextValue = offset > 0 ? collection.getNextValue(currentValue, 1, false) : collection.getPreviousValue(currentValue, 1, false)
			return nextValue ? focusValue(nextValue) : null
		}
		const searchValue = (key, currentValue)=> {
			const values = getEnabledValues()
			if (values.length === 0){
				return null
			}
			const startIndex = Math.max(0, values.indexOf(currentValue) + 1)
			const ordered = [...values.slice(startIndex), ...values.slice(0, startIndex)]
			const lowerKey = key.toLowerCase()
			return ordered.find(value=> (collection.stringify(value) ?? '').toLowerCase().startsWith(lowerKey)) ?? null
		}
		const toggleValue = (value)=> {
			const current = [...api.value]
			const isSelected = current.includes(value)
			if (multiple()){
				api.setValue(isSelected ? current.filter(item=> item !== value) : [...current, value])
				return
			}

			api.setValue(isSelected ? [] : [value])
		}

		return {
			...api,
			name: machineProps.name,
			multiple,
			getCollection,
			focusValue,
			focusBoundary,
			moveFocus,
			searchValue,
			toggleValue,
			getItemData: value=> collection.find(value),
			getRootProps: ()=> mergeProps(api.getRootProps(), elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef, (value)=> {
					rootNode = value
				}),
				asChild: machineProps.asChild,
				'data-disabled': dataAttr(Boolean(machineProps.disabled)),
				...anatomy.root.attrs,
				children: machineProps.children,
			}),
		}
	})
}

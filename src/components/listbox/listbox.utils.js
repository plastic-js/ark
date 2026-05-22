import { ListCollection } from '@zag-js/collection'

const flattenValues = (value)=> {
	if (Array.isArray(value)){
		return value.flatMap(flattenValues)
	}

	if (value == null || value === false || value === true){
		return []
	}

	return [value]
}

const isDescriptor = value=> value != null && typeof value === 'object' && 'tag' in value

const getDescriptorChildren = descriptor=> descriptor?.props?.children ?? descriptor?.children ?? null

const isListboxPartDescriptor = (value, part)=> isDescriptor(value) && value.tag?.listboxPart === part

const readTextContent = value=> flattenValues(value).map((child)=> {
	if (typeof child === 'string' || typeof child === 'number'){
		return String(child)
	}

	if (isDescriptor(child)){
		return readTextContent(getDescriptorChildren(child))
	}

	return ''
}).join('')
	.trim()

const collectItems = (children, state, groupId = null)=> {
	flattenValues(children).forEach((child)=> {
		if (!isDescriptor(child)){
			return
		}

		if (isListboxPartDescriptor(child, 'group')){
			const nextGroupId = child.props?.id ?? `${state.baseId}--group-${state.groupCount++}`
			collectItems(getDescriptorChildren(child), state, nextGroupId)
			return
		}

		if (isListboxPartDescriptor(child, 'item')){
			const props = child.props ?? {}
			state.items.push({
				value: props.value ?? props['data-value'] ?? `${state.baseId}--item-${state.items.length}`,
				label: props.textValue ?? props['data-text-value'] ?? readTextContent(getDescriptorChildren(child)),
				disabled: props.disabled === true || props['data-disabled'] === true || props['data-disabled'] === 'true',
				groupId,
			})
			return
		}

		collectItems(getDescriptorChildren(child), state, groupId)
	})
}

export const createListboxCollection = (children, baseId)=> {
	const state = {
		baseId,
		groupCount: 0,
		items: [],
	}
	collectItems(children, state)
	return new ListCollection({
		items: state.items,
		itemToValue: item=> item.value,
		itemToString: item=> item.label ?? item.value,
		isItemDisabled: item=> Boolean(item.disabled),
	})
}

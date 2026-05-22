const normalizeText = value=> String(value ?? '').trim().toLowerCase()

const readItemText = item=> normalizeText(item.textValue ?? item.root?.dataset?.textValue ?? item.text?.dataset?.textValue ?? item.text?.textContent ?? item.root?.textContent)

export const collectionKeyboardMap = {
	vertical: {
		next: ['ArrowDown'],
		previous: ['ArrowUp'],
	},
	horizontal: {
		next: ['ArrowRight'],
		previous: ['ArrowLeft'],
	},
	common: {
		first: 'Home',
		last: 'End',
		select: ['Enter', ' '],
		open: ['ArrowDown', 'ArrowUp'],
		close: 'Escape',
	},
}

export const createCollectionIds = (baseId, value)=> ({
	item: `${baseId}--item--${value}`,
	itemText: `${baseId}--item-text--${value}`,
	itemIndicator: `${baseId}--item-indicator--${value}`,
	itemInput: `${baseId}--item-input--${value}`,
})

export const createCollectionRegistry = (items)=> {
	const getItems = ()=> [...items.entries()].map(([value, item], index)=> ({
		value,
		index,
		...item,
	}))

	const isItemDisabled = item=> Boolean(item.disabled || item.root?.hasAttribute('data-disabled') || item.root?.dataset?.disabled === 'true' || item.control?.disabled || item.input?.disabled)

	const getEnabledItems = ()=> getItems().filter(item=> !isItemDisabled(item))

	const getItemByValue = value=> getItems().find(item=> item.value === value) ?? null

	const getNextEnabledItem = (currentValue, offset = 1)=> {
		const enabledItems = getEnabledItems()
		if (enabledItems.length === 0){
			return null
		}

		const currentIndex = enabledItems.findIndex(item=> item.value === currentValue)
		const baseIndex = currentIndex === -1 ? offset < 0 ? 0 : -1 : currentIndex
		const nextIndex = (baseIndex + offset + enabledItems.length) % enabledItems.length
		return enabledItems[nextIndex] ?? null
	}

	const getFirstEnabledItem = ()=> getEnabledItems()[0] ?? null

	const getLastEnabledItem = ()=> {
		const enabledItems = getEnabledItems()
		return enabledItems[enabledItems.length - 1] ?? null
	}

	const getItemText = item=> readItemText(item)

	const getItemByText = (search, currentValue)=> {
		const normalizedSearch = normalizeText(search)
		if (!normalizedSearch){
			return null
		}

		const enabledItems = getEnabledItems()
		if (enabledItems.length === 0){
			return null
		}

		const startIndex = currentValue == null ? 0 : enabledItems.findIndex(item=> item.value === currentValue) + 1
		const orderedItems = [
			...enabledItems.slice(startIndex),
			...enabledItems.slice(0, startIndex),
		]

		return orderedItems.find(item=> getItemText(item).startsWith(normalizedSearch)) ?? null
	}

	return {
		getItems,
		getEnabledItems,
		getFirstEnabledItem,
		getItemByText,
		getItemByValue,
		getItemText,
		getLastEnabledItem,
		getNextEnabledItem,
		isItemDisabled,
	}
}

export const createTypeahead = ({ timeout = 350 } = {})=> {
	let search = ''
	let timerId = null

	const clear = ()=> {
		search = ''
		if (timerId){
			clearTimeout(timerId)
			timerId = null
		}
	}

	const append = (key)=> {
		if (typeof key !== 'string' || key.length !== 1 || key.trim() === ''){
			return search
		}

		search += key.toLowerCase()
		if (timerId){
			clearTimeout(timerId)
		}

		timerId = setTimeout(()=> {
			search = ''
			timerId = null
		}, timeout)
		return search
	}

	return {
		append,
		clear,
		search: ({
			key,
			registry,
			currentValue,
		})=> {
			const nextSearch = append(key)
			if (!nextSearch || !registry){
				return null
			}

			return registry.getItemByText(nextSearch, currentValue)
		},
		value: ()=> search,
	}
}

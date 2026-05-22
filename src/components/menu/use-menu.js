import * as menu from '@zag-js/menu'
import { createComputed, normalizeProps, useMachine } from '@plastic-js/zag'
import {
	createSplitProps,
	createUniqueId,
	dataAttr,
	mergeProps,
	mergeRefs,
	usePresenceStrategy,
} from '../../utils/index.js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
import { menuAnatomy } from './menu.anatomy.js'

const splitMenuProps = createSplitProps([
	...menu.props,
	'disabled',
	'lazyMount',
	'unmountOnExit',
	'rootRef',
	'asChild',
	'children',
])

export const useMenu = (props = {})=> {
	const [machineProps, elementProps] = splitMenuProps(props)
	const anatomy = menuAnatomy.build()
	const id = machineProps.id ?? createUniqueId('menu')
	const locale = useLocaleContext()
	const environment = useEnvironmentContext()
	let rootNode = null
	const service = useMachine(menu.machine, ()=> ({
		id,
		dir: locale.dir,
		getRootNode: environment.getRootNode,
		...machineProps,
		onOpenChange: details=> machineProps.onOpenChange?.(details.open),
		onSelect: details=> machineProps.onSelect?.(details.value),
	}))

	const hasMounted = usePresenceStrategy(()=> service.state.hasTag('open'), machineProps.lazyMount)

	return createComputed(()=> {
		const api = menu.connect(service, normalizeProps)
		const getContentElement = ()=> {
			return rootNode?.querySelector?.('[data-scope="menu"][data-part="content"]') ?? null
		}
		const getTriggerElement = ()=> rootNode?.querySelector?.('[data-scope="menu"][data-part="trigger"]') ?? null
		const getEnabledItems = ()=> [...getContentElement()?.querySelectorAll?.('[data-scope="menu"][data-part="item"]') ?? []].filter(item=> item.getAttribute('aria-disabled') !== 'true' && item.dataset.disabled !== '')
		const getItemElement = value=> getEnabledItems().find(item=> item.dataset.value === value) ?? getContentElement()?.querySelector?.(`[data-scope="menu"][data-part="item"][data-value="${value}"]`) ?? null
		const focusItem = (value)=> {
			const item = getItemElement(value)
			if (item && !item.hasAttribute('tabindex')){
				item.tabIndex = -1
			}
			item?.focus?.()
			if (value != null){
				api.setHighlightedValue(value)
			}
			return item
		}
		const focusBoundary = (boundary)=> {
			const items = getEnabledItems()
			const item = boundary === 'last' ? items[items.length - 1] : items[0]
			if (!item){
				return null
			}
			return focusItem(item.dataset.value)
		}
		const moveFocus = (currentValue, offset)=> {
			const items = getEnabledItems()
			if (items.length === 0){
				return null
			}
			const currentIndex = items.findIndex(item=> item.dataset.value === currentValue)
			const nextIndex = currentIndex === -1 ? offset > 0 ? 0 : items.length - 1 : Math.max(0, Math.min(items.length - 1, currentIndex + offset))
			return focusItem(items[nextIndex]?.dataset.value)
		}
		const searchValue = (key, currentValue)=> {
			const items = getEnabledItems()
			const startIndex = Math.max(0, items.findIndex(item=> item.dataset.value === currentValue) + 1)
			const ordered = [...items.slice(startIndex), ...items.slice(0, startIndex)]
			const lowerKey = key.toLowerCase()
			return ordered.find(item=> (item.dataset.valuetext ?? item.textContent ?? '').trim().toLowerCase().startsWith(lowerKey))?.dataset.value ?? null
		}
		const selectValue = (value)=> {
			getItemElement(value)?.click?.()
		}
		const commitValue = (value)=> {
			machineProps.onSelect?.(value)
			api.setOpen(false)
			getTriggerElement()?.focus?.()
		}
		const closeAndFocusTrigger = ()=> {
			api.setOpen(false)
			getTriggerElement()?.focus?.()
		}

		return {
			...api,
			unmounted: !api.open && (!hasMounted() || machineProps.unmountOnExit),
			focusBoundary,
			focusItem,
			moveFocus,
			searchValue,
			selectValue,
			commitValue,
			closeAndFocusTrigger,
			getRootProps: ()=> mergeProps(elementProps, {
				ref: mergeRefs(elementProps.ref, machineProps.rootRef, (value)=> {
					rootNode = value
				}),
				asChild: machineProps.asChild,
				'data-disabled': dataAttr(Boolean(machineProps.disabled)),
				'data-state': api.open ? 'open' : 'closed',
				children: machineProps.children,
			}),
		}
	})
}

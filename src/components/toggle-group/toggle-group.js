import { ToggleGroupItem } from './toggle-group-item.jsx'
import { ToggleGroupRoot } from './toggle-group-root.jsx'

const toggleGroupParts = {
	Root: ToggleGroupRoot,
	Item: ToggleGroupItem,
}

export const ToggleGroup = Object.assign(ToggleGroupRoot, toggleGroupParts)
export {
	ToggleGroupItem as Item,
	ToggleGroupRoot as Root,
}

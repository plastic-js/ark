import { RatingGroupRoot } from './rating-group-root.jsx'
import { RatingGroupLabel } from './rating-group-label.jsx'
import { RatingGroupControl } from './rating-group-control.jsx'
import { RatingGroupItem } from './rating-group-item.jsx'
import { RatingGroupItemText } from './rating-group-item-text.jsx'
import { RatingGroupHiddenInput } from './rating-group-hidden-input.jsx'

const ratingGroupParts = {
	Root: RatingGroupRoot,
	Label: RatingGroupLabel,
	Control: RatingGroupControl,
	Item: RatingGroupItem,
	ItemText: RatingGroupItemText,
	HiddenInput: RatingGroupHiddenInput,
}

export const RatingGroup = Object.assign(RatingGroupRoot, ratingGroupParts)
export {
	RatingGroupRoot as Root,
	RatingGroupLabel as Label,
	RatingGroupControl as Control,
	RatingGroupItem as Item,
	RatingGroupItemText as ItemText,
	RatingGroupHiddenInput as HiddenInput,
}

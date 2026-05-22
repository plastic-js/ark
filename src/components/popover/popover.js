import { PopoverAnchor } from './popover-anchor.jsx'
import { PopoverArrow } from './popover-arrow.jsx'
import { PopoverArrowTip } from './popover-arrow-tip.jsx'
import { PopoverCloseTrigger } from './popover-close-trigger.jsx'
import { PopoverContent } from './popover-content.jsx'
import { PopoverDescription } from './popover-description.jsx'
import { PopoverIndicator } from './popover-indicator.jsx'
import { PopoverPositioner } from './popover-positioner.jsx'
import { PopoverRoot } from './popover-root.jsx'
import { PopoverTitle } from './popover-title.jsx'
import { PopoverTrigger } from './popover-trigger.jsx'

const popoverParts = {
	Root: PopoverRoot,
	Anchor: PopoverAnchor,
	Trigger: PopoverTrigger,
	Positioner: PopoverPositioner,
	Content: PopoverContent,
	Title: PopoverTitle,
	Description: PopoverDescription,
	CloseTrigger: PopoverCloseTrigger,
	Indicator: PopoverIndicator,
	Arrow: PopoverArrow,
	ArrowTip: PopoverArrowTip,
}

export const Popover = Object.assign(PopoverRoot, popoverParts)
export {
	PopoverAnchor as Anchor,
	PopoverArrow as Arrow,
	PopoverArrowTip as ArrowTip,
	PopoverCloseTrigger as CloseTrigger,
	PopoverContent as Content,
	PopoverDescription as Description,
	PopoverIndicator as Indicator,
	PopoverPositioner as Positioner,
	PopoverRoot as Root,
	PopoverTitle as Title,
	PopoverTrigger as Trigger,
}

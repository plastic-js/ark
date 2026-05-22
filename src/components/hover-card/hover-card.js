import { HoverCardArrow } from './hover-card-arrow.jsx'
import { HoverCardArrowTip } from './hover-card-arrow-tip.jsx'
import { HoverCardContent } from './hover-card-content.jsx'
import { HoverCardPositioner } from './hover-card-positioner.jsx'
import { HoverCardRoot } from './hover-card-root.jsx'
import { HoverCardTrigger } from './hover-card-trigger.jsx'

const hoverCardParts = {
	Root: HoverCardRoot,
	Trigger: HoverCardTrigger,
	Positioner: HoverCardPositioner,
	Content: HoverCardContent,
	Arrow: HoverCardArrow,
	ArrowTip: HoverCardArrowTip,
}

export const HoverCard = Object.assign(HoverCardRoot, hoverCardParts)
export {
	HoverCardArrow as Arrow,
	HoverCardArrowTip as ArrowTip,
	HoverCardContent as Content,
	HoverCardPositioner as Positioner,
	HoverCardRoot as Root,
	HoverCardTrigger as Trigger,
}

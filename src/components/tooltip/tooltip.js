import { TooltipArrow } from './tooltip-arrow.jsx'
import { TooltipArrowTip } from './tooltip-arrow-tip.jsx'
import { TooltipContent } from './tooltip-content.jsx'
import { TooltipPositioner } from './tooltip-positioner.jsx'
import { TooltipRoot } from './tooltip-root.jsx'
import { TooltipTrigger } from './tooltip-trigger.jsx'

const tooltipParts = {
	Root: TooltipRoot,
	Trigger: TooltipTrigger,
	Positioner: TooltipPositioner,
	Content: TooltipContent,
	Arrow: TooltipArrow,
	ArrowTip: TooltipArrowTip,
}

export const Tooltip = Object.assign(TooltipRoot, tooltipParts)
export {
	TooltipArrow as Arrow,
	TooltipArrowTip as ArrowTip,
	TooltipContent as Content,
	TooltipPositioner as Positioner,
	TooltipRoot as Root,
	TooltipTrigger as Trigger,
}

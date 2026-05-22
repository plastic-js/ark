import { CollapsibleContent } from './collapsible-content.jsx'
import { CollapsibleIndicator } from './collapsible-indicator.jsx'
import { CollapsibleRoot } from './collapsible-root.jsx'
import { CollapsibleTrigger } from './collapsible-trigger.jsx'

const collapsibleParts = {
	Root: CollapsibleRoot,
	Trigger: CollapsibleTrigger,
	Content: CollapsibleContent,
	Indicator: CollapsibleIndicator,
}

export const Collapsible = Object.assign(CollapsibleRoot, collapsibleParts)
export {
	CollapsibleContent as Content,
	CollapsibleIndicator as Indicator,
	CollapsibleRoot as Root,
	CollapsibleTrigger as Trigger,
}

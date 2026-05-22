import { AccordionContent } from './accordion-content.jsx'
import { AccordionItem } from './accordion-item.jsx'
import { AccordionItemIndicator } from './accordion-item-indicator.jsx'
import { AccordionRoot } from './accordion-root.jsx'
import { AccordionTrigger } from './accordion-trigger.jsx'

const accordionParts = {
	Root: AccordionRoot,
	Item: AccordionItem,
	ItemIndicator: AccordionItemIndicator,
	Trigger: AccordionTrigger,
	Content: AccordionContent,
}

export const Accordion = Object.assign(AccordionRoot, accordionParts)
export {
	AccordionContent as Content,
	AccordionItem as Item,
	AccordionItemIndicator as ItemIndicator,
	AccordionRoot as Root,
	AccordionTrigger as Trigger,
}

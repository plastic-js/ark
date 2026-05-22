import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useAccordionContext, useAccordionItemContext } from './accordion-context.js'

export const AccordionTrigger = (props = {})=> {
	const accordion = useAccordionContext()
	const itemProps = useAccordionItemContext()
	return ark.button(mergeProps(()=> accordion().getItemTriggerProps(itemProps), props))
}

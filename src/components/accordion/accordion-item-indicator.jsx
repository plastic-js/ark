import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useAccordionContext, useAccordionItemContext } from './accordion-context.js'

export const AccordionItemIndicator = (props = {})=> {
	const accordion = useAccordionContext()
	const itemProps = useAccordionItemContext()
	return ark.div(mergeProps(()=> accordion().getItemIndicatorProps(itemProps), props))
}

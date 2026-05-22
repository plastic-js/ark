import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { AccordionItemProvider, useAccordionContext } from './accordion-context.js'

const splitItemProps = createSplitProps(['value', 'disabled'])

export const AccordionItem = (props = {})=> {
	const [itemProps, localProps] = splitItemProps(props)
	const accordion = useAccordionContext()
	const mergedProps = mergeProps(()=> accordion().getItemProps(itemProps), localProps)
	return AccordionItemProvider({
		value: itemProps,
		children: ()=> ark.div(mergedProps),
	})
}

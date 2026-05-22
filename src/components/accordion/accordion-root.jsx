import * as accordion from '@zag-js/accordion'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { AccordionProvider } from './accordion-context.js'
import { useAccordion } from './use-accordion.js'

const splitAccordionProps = createSplitProps([...accordion.props, 'lazyMount', 'unmountOnExit'])

export const AccordionRoot = (props = {})=> {
	const [machineProps, elementProps] = splitAccordionProps(props)
	const accordion = useAccordion(machineProps)
	return AccordionProvider({
		value: accordion,
		children: ()=> ark.div(mergeProps(accordion().getRootProps(), elementProps)),
	})
}

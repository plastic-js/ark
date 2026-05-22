import {
	Either, False, True, createEffect, createSignal,
} from '../../runtime.js'
import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useAccordionContext, useAccordionItemContext } from './accordion-context.js'

export const AccordionContent = (props = {})=> {
	const accordion = useAccordionContext()
	const itemProps = useAccordionItemContext()
	const lazyMount = accordion().lazyMount
	const unmountOnExit = accordion().unmountOnExit
	const isExpanded = ()=> !accordion().getItemContentProps(itemProps).hidden

	if (!lazyMount && !unmountOnExit){
		return ark.div(mergeProps(()=> accordion().getItemContentProps(itemProps), props))
	}

	const hasMounted = createSignal(isExpanded())
	createEffect(()=> { if (isExpanded()){ hasMounted(true) } })
	return (
		<Either condition={()=> isExpanded() || hasMounted() && !unmountOnExit}>
			<True>
				{ark.div(mergeProps(()=> accordion().getItemContentProps(itemProps), props))}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}

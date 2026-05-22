import {
	Either, False, True, createEffect, createSignal,
} from '../../runtime.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useTabsContext } from './tabs-context.js'

const splitContentProps = createSplitProps(['value'])

export const TabsContent = (props = {})=> {
	const tabs = useTabsContext()
	const [contentProps, elementProps] = splitContentProps(props)
	const lazyMount = tabs().lazyMount
	const unmountOnExit = tabs().unmountOnExit
	const isActive = ()=> !tabs().getContentProps(contentProps).hidden

	if (!lazyMount && !unmountOnExit){
		return ark.div(mergeProps(()=> tabs().getContentProps(contentProps), elementProps))
	}

	const hasMounted = createSignal(isActive())
	createEffect(()=> { if (isActive()){ hasMounted(true) } })
	return (
		<Either condition={()=> isActive() || hasMounted() && !unmountOnExit}>
			<True>
				{ark.div(mergeProps(()=> tabs().getContentProps(contentProps), elementProps))}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}

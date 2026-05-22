import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSplitterContext } from './splitter-context.js'

const splitProps = createSplitProps(['id', 'disabled'])

export const SplitterResizeTriggerIndicator = (props = {})=> {
	const splitter = useSplitterContext()
	const [localProps, elementProps] = splitProps(props)
	return ark.div(mergeProps(()=> splitter().getResizeTriggerIndicator({ id: localProps.id, disabled: localProps.disabled }), elementProps))
}

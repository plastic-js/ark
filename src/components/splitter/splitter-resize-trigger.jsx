import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSplitterContext } from './splitter-context.js'

export const SplitterResizeTrigger = (props = {})=> {
	const splitter = useSplitterContext()
	return ark.div(mergeProps(()=> splitter().getResizeTriggerProps(), props))
}

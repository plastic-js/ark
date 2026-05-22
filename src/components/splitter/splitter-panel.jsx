import { mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useSplitterContext } from './splitter-context.js'

export const SplitterPanel = (props = {})=> {
	const splitter = useSplitterContext()
	const index = splitter().claimPanelIndex()
	return ark.div(mergeProps(()=> splitter().getPanelProps(index), props))
}

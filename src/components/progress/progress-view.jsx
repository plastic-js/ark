import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useProgressContext } from './progress-context.js'

const splitProps = createSplitProps(['state'])

export const ProgressView = (props = {})=> {
	const progress = useProgressContext()
	const [localProps, elementProps] = splitProps(props)
	return ark.div(mergeProps(()=> progress().getViewProps({ state: localProps.state }), elementProps))
}

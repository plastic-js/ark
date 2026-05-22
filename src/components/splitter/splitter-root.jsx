import * as splitter from '@zag-js/splitter'
import { ark } from '../factory.js'
import { createSplitProps, mergeProps } from '../../utils/index.js'
import { SplitterProvider } from './splitter-context.js'
import { useSplitter } from './use-splitter.js'

const splitSplitterProps = createSplitProps([
	...splitter.props,
	'value',
	'defaultValue',
	'onValueChange',
	'min',
	'max',
	'step',
	'disabled',
	'rootRef',
	'asChild',
	'children',
])

export const SplitterRoot = (props = {})=> {
	const [machineProps, elementProps] = splitSplitterProps(props)
	const splitterApi = useSplitter(machineProps)
	return SplitterProvider({
		value: splitterApi,
		children: ()=> ark.div(mergeProps(()=> splitterApi().getRootProps(), elementProps)),
	})
}

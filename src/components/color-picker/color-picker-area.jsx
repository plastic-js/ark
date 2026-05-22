import { createSplitProps, mergeProps } from '../../utils/index.js'
import { ark } from '../factory.js'
import { useColorPickerContext } from './color-picker-context.js'

const splitAreaProps = createSplitProps(['xChannel', 'yChannel'])

export const ColorPickerArea = (props = {})=> {
	const colorPicker = useColorPickerContext()
	const [areaProps, elementProps] = splitAreaProps(props)
	return ark.div(mergeProps(()=> colorPicker().getAreaProps(areaProps), elementProps))
}
